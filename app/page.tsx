"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  DollarSign,
  PiggyBank,
  TrendingUp,
  CalendarIcon,
  PieChart,
  BarChart3,
  AlertTriangle,
  LineChartIcon,
  ShoppingBag,
} from "lucide-react"
import {
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts"
import AskFashalHeader from "@/components/ask-fashal-header"
import UnifiedSavingsHabitTracker from "@/components/unified-savings-habit-tracker"
import { getCurrencyByCountry, formatCurrencyByLocale } from "@/lib/currency-map"

const countries = [
  { code: "AF", name: "Afghanistan", flag: "🇦🇫", defaultTax: 20, currency: "AFN", locale: "fa-AF" },
  { code: "AL", name: "Albania", flag: "🇦🇱", defaultTax: 23, currency: "ALL", locale: "sq-AL" },
  { code: "DZ", name: "Algeria", flag: "🇩🇿", defaultTax: 19, currency: "DZD", locale: "ar-DZ" },
  { code: "AD", name: "Andorra", flag: "🇦🇩", defaultTax: 10, currency: "EUR", locale: "ca-AD" },
  { code: "AO", name: "Angola", flag: "🇦🇴", defaultTax: 17, currency: "AOA", locale: "pt-AO" },
  { code: "AG", name: "Antigua and Barbuda", flag: "🇦🇬", defaultTax: 15, currency: "XCD", locale: "en-AG" },
  { code: "AR", name: "Argentina", flag: "🇦🇷", defaultTax: 35, currency: "ARS", locale: "es-AR" },
  { code: "AM", name: "Armenia", flag: "🇦🇲", defaultTax: 23, currency: "AMD", locale: "hy-AM" },
  { code: "AU", name: "Australia", flag: "🇦🇺", defaultTax: 32.5, currency: "AUD", locale: "en-AU" },
  { code: "AT", name: "Austria", flag: "🇦🇹", defaultTax: 50, currency: "EUR", locale: "de-AT" },
  { code: "AZ", name: "Azerbaijan", flag: "🇦🇿", defaultTax: 25, currency: "AZN", locale: "az-AZ" },
  { code: "BS", name: "Bahamas", flag: "🇧🇸", defaultTax: 0, currency: "BSD", locale: "en-BS" },
  { code: "BH", name: "Bahrain", flag: "🇧🇭", defaultTax: 0, currency: "BHD", locale: "ar-BH" },
  { code: "BD", name: "Bangladesh", flag: "🇧🇩", defaultTax: 25, currency: "BDT", locale: "bn-BD" },
  { code: "BB", name: "Barbados", flag: "🇧🇧", defaultTax: 28.5, currency: "BBD", locale: "en-BB" },
  { code: "BY", name: "Belarus", flag: "🇧🇾", defaultTax: 13, currency: "BYN", locale: "be-BY" },
  { code: "BE", name: "Belgium", flag: "🇧🇪", defaultTax: 50, currency: "EUR", locale: "nl-BE" },
  { code: "BZ", name: "Belize", flag: "🇧🇿", defaultTax: 25, currency: "BZD", locale: "en-BZ" },
  { code: "BJ", name: "Benin", flag: "🇧🇯", defaultTax: 35, currency: "XOF", locale: "fr-BJ" },
  { code: "BT", name: "Bhutan", flag: "🇧🇹", defaultTax: 25, currency: "BTN", locale: "dz-BT" },
  { code: "BO", name: "Bolivia", flag: "🇧🇴", defaultTax: 13, currency: "BOB", locale: "es-BO" },
  { code: "BA", name: "Bosnia and Herzegovina", flag: "🇧🇦", defaultTax: 10, currency: "BAM", locale: "bs-BA" },
  { code: "BW", name: "Botswana", flag: "🇧🇼", defaultTax: 25, currency: "BWP", locale: "en-BW" },
  { code: "BR", name: "Brazil", flag: "🇧🇷", defaultTax: 27.5, currency: "BRL", locale: "pt-BR" },
  { code: "BN", name: "Brunei", flag: "🇧🇳", defaultTax: 0, currency: "BND", locale: "ms-BN" },
  { code: "BG", name: "Bulgaria", flag: "🇧🇬", defaultTax: 10, currency: "BGN", locale: "bg-BG" },
  { code: "BF", name: "Burkina Faso", flag: "🇧🇫", defaultTax: 27.5, currency: "XOF", locale: "fr-BF" },
  { code: "BI", name: "Burundi", flag: "🇧🇮", defaultTax: 30, currency: "BIF", locale: "fr-BI" },
  { code: "CV", name: "Cabo Verde", flag: "🇨🇻", defaultTax: 21, currency: "CVE", locale: "pt-CV" },
  { code: "KH", name: "Cambodia", flag: "🇰🇭", defaultTax: 20, currency: "KHR", locale: "km-KH" },
  { code: "CM", name: "Cameroon", flag: "🇨🇲", defaultTax: 35, currency: "XAF", locale: "fr-CM" },
  { code: "CA", name: "Canada", flag: "🇨🇦", defaultTax: 26, currency: "CAD", locale: "en-CA" },
  { code: "CF", name: "Central African Republic", flag: "🇨🇫", defaultTax: 30, currency: "XAF", locale: "fr-CF" },
  { code: "TD", name: "Chad", flag: "🇹🇩", defaultTax: 35, currency: "XAF", locale: "fr-TD" },
  { code: "CL", name: "Chile", flag: "🇨🇱", defaultTax: 40, currency: "CLP", locale: "es-CL" },
  { code: "CN", name: "China", flag: "🇨🇳", defaultTax: 45, currency: "CNY", locale: "zh-CN" },
  { code: "CO", name: "Colombia", flag: "🇨🇴", defaultTax: 35, currency: "COP", locale: "es-CO" },
  { code: "KM", name: "Comoros", flag: "🇰🇲", defaultTax: 30, currency: "KMF", locale: "ar-KM" },
  { code: "CG", name: "Congo", flag: "🇨🇬", defaultTax: 40, currency: "XAF", locale: "fr-CG" },
  { code: "CR", name: "Costa Rica", flag: "🇨🇷", defaultTax: 25, currency: "CRC", locale: "es-CR" },
  { code: "HR", name: "Croatia", flag: "🇭🇷", defaultTax: 30, currency: "EUR", locale: "hr-HR" },
  { code: "CU", name: "Cuba", flag: "🇨🇺", defaultTax: 50, currency: "CUP", locale: "es-CU" },
  { code: "CY", name: "Cyprus", flag: "🇨🇾", defaultTax: 35, currency: "EUR", locale: "el-CY" },
  { code: "CZ", name: "Czech Republic", flag: "🇨🇿", defaultTax: 23, currency: "CZK", locale: "cs-CZ" },
  { code: "DK", name: "Denmark", flag: "🇩🇰", defaultTax: 55, currency: "DKK", locale: "da-DK" },
  { code: "DJ", name: "Djibouti", flag: "🇩🇯", defaultTax: 20, currency: "DJF", locale: "fr-DJ" },
  { code: "DM", name: "Dominica", flag: "🇩🇲", defaultTax: 15, currency: "XCD", locale: "en-DM" },
  { code: "DO", name: "Dominican Republic", flag: "🇩🇴", defaultTax: 27, currency: "DOP", locale: "es-DO" },
  { code: "EC", name: "Ecuador", flag: "🇪🇨", defaultTax: 35, currency: "USD", locale: "es-EC" },
  { code: "EG", name: "Egypt", flag: "🇪🇬", defaultTax: 25, currency: "EGP", locale: "ar-EG" },
  { code: "SV", name: "El Salvador", flag: "🇸🇻", defaultTax: 30, currency: "USD", locale: "es-SV" },
  { code: "GQ", name: "Equatorial Guinea", flag: "🇬🇶", defaultTax: 35, currency: "XAF", locale: "es-GQ" },
  { code: "ER", name: "Eritrea", flag: "🇪🇷", defaultTax: 30, currency: "ERN", locale: "ti-ER" },
  { code: "EE", name: "Estonia", flag: "🇪🇪", defaultTax: 20, currency: "EUR", locale: "et-EE" },
  { code: "SZ", name: "Eswatini", flag: "🇸🇿", defaultTax: 33, currency: "SZL", locale: "en-SZ" },
  { code: "ET", name: "Ethiopia", flag: "🇪🇹", defaultTax: 35, currency: "ETB", locale: "am-ET" },
  { code: "FJ", name: "Fiji", flag: "🇫🇯", defaultTax: 20, currency: "FJD", locale: "en-FJ" },
  { code: "FI", name: "Finland", flag: "🇫🇮", defaultTax: 56, currency: "EUR", locale: "fi-FI" },
  { code: "FR", name: "France", flag: "🇫🇷", defaultTax: 45, currency: "EUR", locale: "fr-FR" },
  { code: "GA", name: "Gabon", flag: "🇬🇦", defaultTax: 35, currency: "XAF", locale: "fr-GA" },
  { code: "GM", name: "Gambia", flag: "🇬🇲", defaultTax: 30, currency: "GMD", locale: "en-GM" },
  { code: "GE", name: "Georgia", flag: "🇬🇪", defaultTax: 20, currency: "GEL", locale: "ka-GE" },
  { code: "DE", name: "Germany", flag: "🇩🇪", defaultTax: 45, currency: "EUR", locale: "de-DE" },
  { code: "GH", name: "Ghana", flag: "🇬🇭", defaultTax: 25, currency: "GHS", locale: "en-GH" },
  { code: "GR", name: "Greece", flag: "🇬🇷", defaultTax: 44, currency: "EUR", locale: "el-GR" },
  { code: "GD", name: "Grenada", flag: "🇬🇩", defaultTax: 30, currency: "XCD", locale: "en-GD" },
  { code: "GT", name: "Guatemala", flag: "🇬🇹", defaultTax: 7, currency: "GTQ", locale: "es-GT" },
  { code: "GN", name: "Guinea", flag: "🇬🇳", defaultTax: 35, currency: "GNF", locale: "fr-GN" },
  { code: "GW", name: "Guinea-Bissau", flag: "🇬🇼", defaultTax: 20, currency: "XOF", locale: "pt-GW" },
  { code: "GY", name: "Guyana", flag: "🇬🇾", defaultTax: 28, currency: "GYD", locale: "en-GY" },
  { code: "HT", name: "Haiti", flag: "🇭🇹", defaultTax: 30, currency: "HTG", locale: "fr-HT" },
  { code: "HN", name: "Honduras", flag: "🇭🇳", defaultTax: 25, currency: "HNL", locale: "es-HN" },
  { code: "HU", name: "Hungary", flag: "🇭🇺", defaultTax: 15, currency: "HUF", locale: "hu-HU" },
  { code: "IS", name: "Iceland", flag: "🇮🇸", defaultTax: 46, currency: "ISK", locale: "is-IS" },
  { code: "IN", name: "India", flag: "🇮🇳", defaultTax: 30, currency: "INR", locale: "en-IN" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩", defaultTax: 35, currency: "IDR", locale: "id-ID" },
  { code: "IR", name: "Iran", flag: "🇮🇷", defaultTax: 35, currency: "IRR", locale: "fa-IR" },
  { code: "IQ", name: "Iraq", flag: "🇮🇶", defaultTax: 15, currency: "IQD", locale: "ar-IQ" },
  { code: "IE", name: "Ireland", flag: "🇮🇪", defaultTax: 40, currency: "EUR", locale: "en-IE" },
  { code: "IL", name: "Israel", flag: "🇮🇱", defaultTax: 50, currency: "ILS", locale: "he-IL" },
  { code: "IT", name: "Italy", flag: "🇮🇹", defaultTax: 43, currency: "EUR", locale: "it-IT" },
  { code: "JM", name: "Jamaica", flag: "🇯🇲", defaultTax: 25, currency: "JMD", locale: "en-JM" },
  { code: "JP", name: "Japan", flag: "🇯🇵", defaultTax: 45, currency: "JPY", locale: "ja-JP" },
  { code: "JO", name: "Jordan", flag: "🇯🇴", defaultTax: 20, currency: "JOD", locale: "ar-JO" },
  { code: "KZ", name: "Kazakhstan", flag: "🇰🇿", defaultTax: 10, currency: "KZT", locale: "kk-KZ" },
  { code: "KE", name: "Kenya", flag: "🇰🇪", defaultTax: 30, currency: "KES", locale: "en-KE" },
  { code: "KI", name: "Kiribati", flag: "🇰🇮", defaultTax: 25, currency: "AUD", locale: "en-KI" },
  { code: "KW", name: "Kuwait", flag: "🇰🇼", defaultTax: 0, currency: "KWD", locale: "ar-KW" },
  { code: "KG", name: "Kyrgyzstan", flag: "🇰🇬", defaultTax: 10, currency: "KGS", locale: "ky-KG" },
  { code: "LA", name: "Laos", flag: "🇱🇦", defaultTax: 24, currency: "LAK", locale: "lo-LA" },
  { code: "LV", name: "Latvia", flag: "🇱🇻", defaultTax: 31, currency: "EUR", locale: "lv-LV" },
  { code: "LB", name: "Lebanon", flag: "🇱🇧", defaultTax: 20, currency: "LBP", locale: "ar-LB" },
  { code: "LS", name: "Lesotho", flag: "🇱🇸", defaultTax: 25, currency: "LSL", locale: "en-LS" },
  { code: "LR", name: "Liberia", flag: "🇱🇷", defaultTax: 25, currency: "LRD", locale: "en-LR" },
  { code: "LY", name: "Libya", flag: "🇱🇾", defaultTax: 10, currency: "LYD", locale: "ar-LY" },
  { code: "LI", name: "Liechtenstein", flag: "🇱🇮", defaultTax: 22.4, currency: "CHF", locale: "de-LI" },
  { code: "LT", name: "Lithuania", flag: "🇱🇹", defaultTax: 32, currency: "EUR", locale: "lt-LT" },
  { code: "LU", name: "Luxembourg", flag: "🇱🇺", defaultTax: 42, currency: "EUR", locale: "lb-LU" },
  { code: "MG", name: "Madagascar", flag: "🇲🇬", defaultTax: 20, currency: "MGA", locale: "mg-MG" },
  { code: "MW", name: "Malawi", flag: "🇲🇼", defaultTax: 30, currency: "MWK", locale: "en-MW" },
  { code: "MY", name: "Malaysia", flag: "🇲🇾", defaultTax: 30, currency: "MYR", locale: "ms-MY" },
  { code: "MV", name: "Maldives", flag: "🇲🇻", defaultTax: 0, currency: "MVR", locale: "dv-MV" },
  { code: "ML", name: "Mali", flag: "🇲🇱", defaultTax: 40, currency: "XOF", locale: "fr-ML" },
  { code: "MT", name: "Malta", flag: "🇲🇹", defaultTax: 35, currency: "EUR", locale: "mt-MT" },
  { code: "MH", name: "Marshall Islands", flag: "🇲🇭", defaultTax: 12, currency: "USD", locale: "en-MH" },
  { code: "MR", name: "Mauritania", flag: "🇲🇷", defaultTax: 40, currency: "MRU", locale: "ar-MR" },
  { code: "MU", name: "Mauritius", flag: "🇲🇺", defaultTax: 15, currency: "MUR", locale: "en-MU" },
  { code: "MX", name: "Mexico", flag: "🇲🇽", defaultTax: 35, currency: "MXN", locale: "es-MX" },
  { code: "FM", name: "Micronesia", flag: "🇫🇲", defaultTax: 10, currency: "USD", locale: "en-FM" },
  { code: "MD", name: "Moldova", flag: "🇲🇩", defaultTax: 12, currency: "MDL", locale: "ro-MD" },
  { code: "MC", name: "Monaco", flag: "🇲🇨", defaultTax: 0, currency: "EUR", locale: "fr-MC" },
  { code: "MN", name: "Mongolia", flag: "🇲🇳", defaultTax: 10, currency: "MNT", locale: "mn-MN" },
  { code: "ME", name: "Montenegro", flag: "🇲🇪", defaultTax: 9, currency: "EUR", locale: "sr-ME" },
  { code: "MA", name: "Morocco", flag: "🇲🇦", defaultTax: 38, currency: "MAD", locale: "ar-MA" },
  { code: "MZ", name: "Mozambique", flag: "🇲🇿", defaultTax: 32, currency: "MZN", locale: "pt-MZ" },
  { code: "MM", name: "Myanmar", flag: "🇲🇲", defaultTax: 25, currency: "MMK", locale: "my-MM" },
  { code: "NA", name: "Namibia", flag: "🇳🇦", defaultTax: 37, currency: "NAD", locale: "en-NA" },
  { code: "NR", name: "Nauru", flag: "🇳🇷", defaultTax: 0, currency: "AUD", locale: "en-NR" },
  { code: "NP", name: "Nepal", flag: "🇳🇵", defaultTax: 36, currency: "NPR", locale: "ne-NP" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱", defaultTax: 49.5, currency: "EUR", locale: "nl-NL" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿", defaultTax: 39, currency: "NZD", locale: "en-NZ" },
  { code: "NI", name: "Nicaragua", flag: "🇳🇮", defaultTax: 30, currency: "NIO", locale: "es-NI" },
  { code: "NE", name: "Niger", flag: "🇳🇪", defaultTax: 35, currency: "XOF", locale: "fr-NE" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬", defaultTax: 24, currency: "NGN", locale: "en-NG" },
  { code: "KP", name: "North Korea", flag: "🇰🇵", defaultTax: 0, currency: "KPW", locale: "ko-KP" },
  { code: "MK", name: "North Macedonia", flag: "🇲🇰", defaultTax: 10, currency: "MKD", locale: "mk-MK" },
  { code: "NO", name: "Norway", flag: "🇳🇴", defaultTax: 38, currency: "NOK", locale: "no-NO" },
  { code: "OM", name: "Oman", flag: "🇴🇲", defaultTax: 0, currency: "OMR", locale: "ar-OM" },
  { code: "PK", name: "Pakistan", flag: "🇵🇰", defaultTax: 35, currency: "PKR", locale: "ur-PK" },
  { code: "PW", name: "Palau", flag: "🇵🇼", defaultTax: 20, currency: "USD", locale: "en-PW" },
  { code: "PA", name: "Panama", flag: "🇵🇦", defaultTax: 25, currency: "PAB", locale: "es-PA" },
  { code: "PG", name: "Papua New Guinea", flag: "🇵🇬", defaultTax: 42, currency: "PGK", locale: "en-PG" },
  { code: "PY", name: "Paraguay", flag: "🇵🇾", defaultTax: 10, currency: "PYG", locale: "es-PY" },
  { code: "PE", name: "Peru", flag: "🇵🇪", defaultTax: 30, currency: "PEN", locale: "es-PE" },
  { code: "PH", name: "Philippines", flag: "🇵🇭", defaultTax: 35, currency: "PHP", locale: "en-PH" },
  { code: "PL", name: "Poland", flag: "🇵🇱", defaultTax: 32, currency: "PLN", locale: "pl-PL" },
  { code: "PT", name: "Portugal", flag: "🇵🇹", defaultTax: 48, currency: "EUR", locale: "pt-PT" },
  { code: "QA", name: "Qatar", flag: "🇶🇦", defaultTax: 0, currency: "QAR", locale: "ar-QA" },
  { code: "RO", name: "Romania", flag: "🇷🇴", defaultTax: 10, currency: "RON", locale: "ro-RO" },
  { code: "RU", name: "Russia", flag: "🇷🇺", defaultTax: 13, currency: "RUB", locale: "ru-RU" },
  { code: "RW", name: "Rwanda", flag: "🇷🇼", defaultTax: 30, currency: "RWF", locale: "rw-RW" },
  { code: "KN", name: "Saint Kitts and Nevis", flag: "🇰🇳", defaultTax: 0, currency: "XCD", locale: "en-KN" },
  { code: "LC", name: "Saint Lucia", flag: "🇱🇨", defaultTax: 30, currency: "XCD", locale: "en-LC" },
  {
    code: "VC",
    name: "Saint Vincent and the Grenadines",
    flag: "🇻🇨",
    defaultTax: 30,
    currency: "XCD",
    locale: "en-VC",
  },
  { code: "WS", name: "Samoa", flag: "🇼🇸", defaultTax: 27, currency: "WST", locale: "sm-WS" },
  { code: "SM", name: "San Marino", flag: "🇸🇲", defaultTax: 17, currency: "EUR", locale: "it-SM" },
  { code: "ST", name: "Sao Tome and Principe", flag: "🇸🇹", defaultTax: 25, currency: "STN", locale: "pt-ST" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦", defaultTax: 0, currency: "SAR", locale: "ar-SA" },
  { code: "SN", name: "Senegal", flag: "🇸🇳", defaultTax: 40, currency: "XOF", locale: "fr-SN" },
  { code: "RS", name: "Serbia", flag: "🇷🇸", defaultTax: 10, currency: "RSD", locale: "sr-RS" },
  { code: "SC", name: "Seychelles", flag: "🇸🇨", defaultTax: 15, currency: "SCR", locale: "en-SC" },
  { code: "SL", name: "Sierra Leone", flag: "🇸🇱", defaultTax: 30, currency: "SLL", locale: "en-SL" },
  { code: "SG", name: "Singapore", flag: "🇸🇬", defaultTax: 22, currency: "SGD", locale: "en-SG" },
  { code: "SK", name: "Slovakia", flag: "🇸🇰", defaultTax: 25, currency: "EUR", locale: "sk-SK" },
  { code: "SI", name: "Slovenia", flag: "🇸🇮", defaultTax: 50, currency: "EUR", locale: "sl-SI" },
  { code: "SB", name: "Solomon Islands", flag: "🇸🇧", defaultTax: 35, currency: "SBD", locale: "en-SB" },
  { code: "SO", name: "Somalia", flag: "🇸🇴", defaultTax: 35, currency: "SOS", locale: "so-SO" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦", defaultTax: 45, currency: "ZAR", locale: "en-ZA" },
  { code: "KR", name: "South Korea", flag: "🇰🇷", defaultTax: 45, currency: "KRW", locale: "ko-KR" },
  { code: "SS", name: "South Sudan", flag: "🇸🇸", defaultTax: 0, currency: "SSP", locale: "en-SS" },
  { code: "ES", name: "Spain", flag: "🇪🇸", defaultTax: 47, currency: "EUR", locale: "es-ES" },
  { code: "LK", name: "Sri Lanka", flag: "🇱🇰", defaultTax: 24, currency: "LKR", locale: "si-LK" },
  { code: "SD", name: "Sudan", flag: "🇸🇩", defaultTax: 30, currency: "SDG", locale: "ar-SD" },
  { code: "SR", name: "Suriname", flag: "🇸🇷", defaultTax: 36, currency: "SRD", locale: "nl-SR" },
  { code: "SE", name: "Sweden", flag: "🇸🇪", defaultTax: 52, currency: "SEK", locale: "sv-SE" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭", defaultTax: 40, currency: "CHF", locale: "de-CH" },
  { code: "SY", name: "Syria", flag: "🇸🇾", defaultTax: 15, currency: "SYP", locale: "ar-SY" },
  { code: "TJ", name: "Tajikistan", flag: "🇹🇯", defaultTax: 13, currency: "TJS", locale: "tg-TJ" },
  { code: "TZ", name: "Tanzania", flag: "🇹🇿", defaultTax: 30, currency: "TZS", locale: "sw-TZ" },
  { code: "TH", name: "Thailand", flag: "🇹🇭", defaultTax: 35, currency: "THB", locale: "th-TH" },
  { code: "TL", name: "Timor-Leste", flag: "🇹🇱", defaultTax: 10, currency: "USD", locale: "pt-TL" },
  { code: "TG", name: "Togo", flag: "🇹🇬", defaultTax: 45, currency: "XOF", locale: "fr-TG" },
  { code: "TO", name: "Tonga", flag: "🇹🇴", defaultTax: 0, currency: "TOP", locale: "to-TO" },
  { code: "TT", name: "Trinidad and Tobago", flag: "🇹🇹", defaultTax: 25, currency: "TTD", locale: "en-TT" },
  { code: "TN", name: "Tunisia", flag: "🇹🇳", defaultTax: 35, currency: "TND", locale: "ar-TN" },
  { code: "TR", name: "Turkey", flag: "🇹🇷", defaultTax: 40, currency: "TRY", locale: "tr-TR" },
  { code: "TM", name: "Turkmenistan", flag: "🇹🇲", defaultTax: 10, currency: "TMT", locale: "tk-TM" },
  { code: "TV", name: "Tuvalu", flag: "🇹🇻", defaultTax: 0, currency: "AUD", locale: "en-TV" },
  { code: "UG", name: "Uganda", flag: "🇺🇬", defaultTax: 40, currency: "UGX", locale: "en-UG" },
  { code: "UA", name: "Ukraine", flag: "🇺🇦", defaultTax: 18, currency: "UAH", locale: "uk-UA" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪", defaultTax: 0, currency: "AED", locale: "ar-AE" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", defaultTax: 45, currency: "GBP", locale: "en-GB" },
  { code: "US", name: "United States", flag: "🇺🇸", defaultTax: 24, currency: "USD", locale: "en-US" },
  { code: "UY", name: "Uruguay", flag: "🇺🇾", defaultTax: 36, currency: "UYU", locale: "es-UY" },
  { code: "UZ", name: "Uzbekistan", flag: "🇺🇿", defaultTax: 12, currency: "UZS", locale: "uz-UZ" },
  { code: "VU", name: "Vanuatu", flag: "🇻🇺", defaultTax: 0, currency: "VUV", locale: "en-VU" },
  { code: "VA", name: "Vatican City", flag: "🇻🇦", defaultTax: 0, currency: "EUR", locale: "it-VA" },
  { code: "VE", name: "Venezuela", flag: "🇻🇪", defaultTax: 34, currency: "VES", locale: "es-VE" },
  { code: "VN", name: "Vietnam", flag: "🇻🇳", defaultTax: 35, currency: "VND", locale: "vi-VN" },
  { code: "YE", name: "Yemen", flag: "🇾🇪", defaultTax: 20, currency: "YER", locale: "ar-YE" },
  { code: "ZM", name: "Zambia", flag: "🇿🇲", defaultTax: 37.5, currency: "ZMW", locale: "en-ZM" },
  { code: "ZW", name: "Zimbabwe", flag: "🇿🇼", defaultTax: 40, currency: "ZWL", locale: "en-ZW" },
]

// Budgeting rules
const budgetingRules = [
  {
    id: "50/30/20",
    name: "50/30/20 Rule (Standard)",
    needs: 50,
    wants: 30,
    savings: 20,
    description: "Balanced life for average earners",
  },
  {
    id: "70/20/10",
    name: "70/20/10 Rule (High-Cost)",
    needs: 70,
    wants: 20,
    savings: 10,
    description: "For expensive cities",
  },
  {
    id: "80/20",
    name: "80/20 Rule (Simple)",
    needs: 80,
    wants: 0,
    savings: 20,
    description: "Save first, spend the rest",
  },
  {
    id: "50/15/5",
    name: "50/15/5 Rule (Fidelity)",
    needs: 50,
    wants: 30,
    savings: 15,
    retirement: 5,
    description: "Focus on retirement security",
  },
  {
    id: "pay-yourself",
    name: "Pay Yourself First",
    needs: 0,
    wants: 0,
    savings: 20,
    description: "Save immediately on payday",
  },
  {
    id: "zero-based",
    name: "Zero-Based Budgeting",
    needs: 0,
    wants: 0,
    savings: 0,
    description: "Assign every dollar a job",
  },
  {
    id: "3-6-month",
    name: "3-6 Month Emergency Fund",
    needs: 0,
    wants: 0,
    savings: 100,
    description: "Build emergency reserves",
  },
]

interface DailyExpenseLog {
  amount: number
  category: string
  note: string
}

export default function FinanceDashboard() {
  const [grossIncome, setGrossIncome] = useState<number>(5000)
  const [selectedCountry, setSelectedCountry] = useState(countries.find((c) => c.code === "IN") || countries.find((c) => c.code === "US") || countries[0])
  const [taxSlab, setTaxSlab] = useState<number>(selectedCountry.defaultTax)
  const [financialYear, setFinancialYear] = useState<string>("2024")
  const [selectedRule, setSelectedRule] = useState(budgetingRules[0])
  const [chartType, setChartType] = useState<"pie" | "bar">("pie")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [expenseNotes, setExpenseNotes] = useState<Record<string, DailyExpenseLog>>({})
  const [currentNote, setCurrentNote] = useState<string>("")
  const [currentAmount, setCurrentAmount] = useState<number>(0)
  const [currentCategory, setCurrentCategory] = useState<string>("Needs")

  const [unfortunateExpense, setUnfortunateExpense] = useState<number>(0)
  const [deductFromWants, setDeductFromWants] = useState<boolean>(false)

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat(selectedCountry.locale, {
      style: "currency",
      currency: selectedCountry.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getCurrencySymbol = (): string => {
    try {
      const parts = new Intl.NumberFormat(selectedCountry.locale, {
        style: "currency",
        currency: selectedCountry.currency,
      }).formatToParts(0)

      const symbolPart = parts.find((part) => part.type === "currency")
      if (symbolPart) return symbolPart.value
    } catch (e) {
      // Fallback to currency map
      const currInfo = getCurrencyByCountry(selectedCountry.name || "United States")
      return currInfo.symbol
    }
    return selectedCountry.currency
  }

  // Get currency symbol for global use
  const currencySymbol = getCurrencySymbol()

  // Calculate budgets
  const taxAmount = (grossIncome * taxSlab) / 100
  const netIncome = grossIncome - taxAmount

  const needs = (netIncome * selectedRule.needs) / 100
  let wants = (netIncome * selectedRule.wants) / 100
  let savings = (netIncome * selectedRule.savings) / 100

  // Apply unfortunate expense deduction
  if (unfortunateExpense > 0) {
    if (deductFromWants) {
      // Deduct from Wants
      wants = Math.max(0, wants - unfortunateExpense)
    } else {
      // Deduct from Savings and add to Wants
      savings = Math.max(0, savings - unfortunateExpense)
      wants = wants + unfortunateExpense
    }
  }

  const calculateCumulativeSpending = () => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

    const monthlyData = []
    let cumulative = 0

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      const dateKey = date.toISOString().split("T")[0]
      const log = expenseNotes[dateKey]

      if (log && log.amount) {
        cumulative += log.amount
      }

      monthlyData.push({
        day: day,
        target: (netIncome / daysInMonth) * day,
        actual: cumulative,
        dailySpend: log?.amount || 0,
      })
    }

    return monthlyData
  }

  const monthlySpendingData = calculateCumulativeSpending()

  const generateDisciplineTips = () => {
    const weekendSpending = monthlySpendingData
      .filter((d) => {
        const date = new Date(new Date().getFullYear(), new Date().getMonth(), d.day)
        const dayOfWeek = date.getDay()
        return dayOfWeek === 0 || dayOfWeek === 6
      })
      .reduce((sum, d) => sum + d.dailySpend, 0)

    const weekdaySpending = monthlySpendingData
      .filter((d) => {
        const date = new Date(new Date().getFullYear(), new Date().getMonth(), d.day)
        const dayOfWeek = date.getDay()
        return dayOfWeek !== 0 && dayOfWeek !== 6
      })
      .reduce((sum, d) => sum + d.dailySpend, 0)

    const avgWeekendSpend =
      weekendSpending /
      (monthlySpendingData.filter((d) => {
        const date = new Date(new Date().getFullYear(), new Date().getMonth(), d.day)
        const dayOfWeek = date.getDay()
        return dayOfWeek === 0 || dayOfWeek === 6
      }).length || 1)

    const avgWeekdaySpend =
      weekdaySpending /
      (monthlySpendingData.filter((d) => {
        const date = new Date(new Date().getFullYear(), new Date().getMonth(), d.day)
        const dayOfWeek = date.getDay()
        return dayOfWeek !== 0 && dayOfWeek !== 6
      }).length || 1)

    const tips = []

    if (avgWeekendSpend > avgWeekdaySpend * 1.5) {
      tips.push(
        "Your spending peaks on weekends. To stay disciplined for " +
          financialYear +
          ", try the 3-Day Rule for weekend wants.",
      )
    }

    const lastActual = monthlySpendingData[monthlySpendingData.length - 1]?.actual || 0
    const lastTarget = monthlySpendingData[monthlySpendingData.length - 1]?.target || 1

    if (lastActual > lastTarget * 1.2) {
      tips.push(
        "You're exceeding your monthly budget by more than 20%. Consider reviewing your 'Wants' category and identifying areas to cut back.",
      )
    } else if (lastActual < lastTarget * 0.8) {
      tips.push(
        "Great job! You're under budget this month. Consider allocating extra savings to your emergency fund or investments.",
      )
    }

    const highSpendingDays = monthlySpendingData.filter((d) => d.dailySpend > netIncome / 20)
    if (highSpendingDays.length > 5) {
      tips.push(
        "You have multiple high-spending days this month. Try meal prepping and setting daily spending limits to improve consistency.",
      )
    }

    return tips.length > 0 ? tips : ["Keep tracking your expenses daily to build better financial habits!"]
  }

  const disciplineTips = generateDisciplineTips()

  // Load expense notes from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("expenseNotes")
    if (stored) {
      setExpenseNotes(JSON.parse(stored))
    }
  }, [])

  const saveNote = () => {
    if (selectedDate) {
      const dateKey = selectedDate.toISOString().split("T")[0]
      const updated = {
        ...expenseNotes,
        [dateKey]: {
          amount: currentAmount,
          category: currentCategory,
          note: currentNote,
        },
      }
      setExpenseNotes(updated)
      localStorage.setItem("expenseNotes", JSON.stringify(updated))
      setCurrentNote("")
      setCurrentAmount(0)
    }
  }

  useEffect(() => {
    if (selectedDate) {
      const dateKey = selectedDate.toISOString().split("T")[0]
      const log = expenseNotes[dateKey]
      setCurrentNote(log?.note || "")
      setCurrentAmount(log?.amount || 0)
      setCurrentCategory(log?.category || "Needs")
    }
  }, [selectedDate, expenseNotes])

  // Chart data
  const pieData = [
    { name: "Needs", value: needs, color: "#0f172a" },
    { name: "Wants", value: wants, color: "#475569" },
    { name: "Savings", value: savings, color: "#10b981" },
  ].filter((item) => item.value > 0)

  const barData = [
    { category: "Needs", amount: needs, fill: "#0f172a" },
    { category: "Wants", amount: wants, fill: "#475569" },
    { category: "Savings", amount: savings, fill: "#10b981" },
  ].filter((item) => item.amount > 0)

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 p-3 rounded-lg border border-white/20">
          <p className="text-white font-semibold">{payload[0].name || payload[0].payload.category}</p>
          <p className="text-emerald-400">{formatCurrency(payload[0].value || payload[0].payload.amount)}</p>
        </div>
      )
    }
    return null
  }

  const CustomLineTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 p-3 rounded-lg border border-white/20">
          <p className="text-white font-semibold">Day {payload[0].payload.day}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const CustomBarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 p-3 rounded-lg border border-white/20">
          <p className="text-white font-semibold">Day {payload[0].payload.day}</p>
          <p className="text-emerald-400">{formatCurrency(payload[0].value)}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <AskFashalHeader />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="backdrop-blur-xl bg-white/5 border-white/10 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white text-xl">Financial Inputs</CardTitle>
                <CardDescription className="text-slate-300">Configure your finances</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Gross Income */}
                <div className="space-y-2">
                  <Label htmlFor="income" className="text-slate-200 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Gross Income
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 font-medium">
                      {getCurrencySymbol()}
                    </span>
                    <Input
                      id="income"
                      type="number"
                      value={grossIncome}
                      onChange={(e) => setGrossIncome(Number(e.target.value))}
                      className="backdrop-blur-md bg-white/10 border-white/20 text-white placeholder:text-slate-400 pl-12"
                    />
                  </div>
                </div>

                {/* Country Selector */}
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-slate-200">
                    Country
                  </Label>
                  <Select
                    value={selectedCountry.code}
                    onValueChange={(code) => {
                      const country = countries.find((c) => c.code === code) || countries[0]
                      setSelectedCountry(country)
                      setTaxSlab(country.defaultTax)
                    }}
                  >
                    <SelectTrigger className="backdrop-blur-md bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-white/20 text-white max-h-[300px]">
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code} className="hover:bg-white/10">
                          {country.flag} {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tax Slab */}
                <div className="space-y-2">
                  <Label htmlFor="tax" className="text-slate-200">
                    Tax Slab (%)
                  </Label>
                  <Input
                    id="tax"
                    type="number"
                    value={taxSlab}
                    onChange={(e) => setTaxSlab(Number(e.target.value))}
                    className="backdrop-blur-md bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                  />
                </div>

                {/* Financial Year */}
                <div className="space-y-2">
                  <Label htmlFor="year" className="text-slate-200">
                    Financial Year
                  </Label>
                  <Input
                    id="year"
                    type="text"
                    value={financialYear}
                    onChange={(e) => setFinancialYear(e.target.value)}
                    className="backdrop-blur-md bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                  />
                </div>

                {/* Budgeting Rule Selector */}
                <div className="space-y-2">
                  <Label htmlFor="rule" className="text-slate-200">
                    Budgeting Rule
                  </Label>
                  <Select
                    value={selectedRule.id}
                    onValueChange={(id) => {
                      const rule = budgetingRules.find((r) => r.id === id) || budgetingRules[0]
                      setSelectedRule(rule)
                    }}
                  >
                    <SelectTrigger className="backdrop-blur-md bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-white/20 text-white">
                      {budgetingRules.map((rule) => (
                        <SelectItem key={rule.id} value={rule.id} className="hover:bg-white/10">
                          <div>
                            <div className="font-semibold">{rule.name}</div>
                            <div className="text-xs text-slate-400">{rule.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-white/5 border-white/10 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  Emergency Expense
                </CardTitle>
                <CardDescription className="text-slate-300">Unexpected or unfortunate expenses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="unfortunate" className="text-slate-200">
                    Emergency Amount
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 font-medium">
                      {getCurrencySymbol()}
                    </span>
                    <Input
                      id="unfortunate"
                      type="number"
                      value={unfortunateExpense}
                      onChange={(e) => setUnfortunateExpense(Number(e.target.value))}
                      className="backdrop-blur-md bg-white/10 border-white/20 text-white placeholder:text-slate-400 pl-12"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <Label className="text-slate-200">Deduct From:</Label>
                  <div className="flex items-center justify-between space-x-2 p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                      <Label htmlFor="deduct-toggle" className="text-slate-200 cursor-pointer">
                        {deductFromWants ? "Wants" : "Savings"}
                      </Label>
                    </div>
                    <Switch id="deduct-toggle" checked={deductFromWants} onCheckedChange={setDeductFromWants} />
                  </div>
                  <p className="text-xs text-slate-400">
                    {deductFromWants
                      ? "Emergency expense will reduce your Wants allocation"
                      : "Emergency expense will reduce your Savings and increase Wants/Expenses"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Live Summary */}
            <Card className="backdrop-blur-xl bg-white/5 border-white/10 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Live Summary</CardTitle>
                <CardDescription className="text-slate-300">
                  Your financial breakdown for {financialYear}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <p className="text-slate-400 text-sm">Gross Income</p>
                    <p className="text-white text-2xl font-bold">{formatCurrency(grossIncome)}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-slate-400 text-sm">Tax ({taxSlab}%)</p>
                    <p className="text-red-400 text-2xl font-bold">-{formatCurrency(taxAmount)}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-slate-400 text-sm">Net Income</p>
                    <p className="text-emerald-400 text-2xl font-bold">{formatCurrency(netIncome)}</p>
                  </div>
                  {unfortunateExpense > 0 && (
                    <div className="space-y-2">
                      <p className="text-slate-400 text-sm">Emergency Impact</p>
                      <p className="text-yellow-400 text-2xl font-bold">-{formatCurrency(unfortunateExpense)}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Budget Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="backdrop-blur-xl bg-white/5 border-white/10 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Needs
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Essential expenses ({selectedRule.needs}%)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white text-3xl font-bold">{formatCurrency(needs)}</p>
                  <p className="text-emerald-400 text-sm mt-2">Protected allocation</p>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-xl bg-white/5 border-white/10 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5" /> {/* Changed icon to ShoppingBag */}
                    Wants
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Discretionary spending ({selectedRule.wants}%)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white text-3xl font-bold">{formatCurrency(wants)}</p>
                  {unfortunateExpense > 0 && (
                    <p className="text-yellow-400 text-sm mt-2">
                      {deductFromWants
                        ? `Reduced by emergency: -${formatCurrency(unfortunateExpense)}`
                        : `Increased by emergency: +${formatCurrency(unfortunateExpense)}`}
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card className="backdrop-blur-xl bg-emerald-500/10 border-emerald-500/30 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <PiggyBank className="w-5 h-5" />
                    Savings
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Future security ({selectedRule.savings}%)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-emerald-400 text-3xl font-bold">{formatCurrency(savings)}</p>
                  {unfortunateExpense > 0 && !deductFromWants && (
                    <p className="text-yellow-400 text-sm mt-2">
                      Reduced by emergency: -{formatCurrency(unfortunateExpense)}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card className="backdrop-blur-xl bg-white/5 border-white/10 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <LineChartIcon className="w-5 h-5" />
                  Financial Discipline Tracker
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Monthly Target vs. Actual Cumulative Spending
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={monthlySpendingData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis
                      dataKey="day"
                      stroke="#94a3b8"
                      label={{ value: "Day of Month", position: "insideBottom", offset: -5, fill: "#94a3b8" }}
                    />
                    <YAxis
                      stroke="#94a3b8"
                      label={{
                        value: `Amount (${getCurrencySymbol()})`,
                        angle: -90,
                        position: "insideLeft",
                        fill: "#94a3b8",
                      }}
                    />
                    <Tooltip content={<CustomLineTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="#10b981"
                      strokeWidth={2}
                      name="Monthly Target"
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="#ef4444"
                      strokeWidth={2}
                      name="Actual Spending"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Budget Visualization */}
            <Card className="backdrop-blur-xl bg-white/5 border-white/10 shadow-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white flex items-center gap-2">
                      <PieChart className="w-5 h-5" />
                      Budget Breakdown
                    </CardTitle>
                    <CardDescription className="text-slate-300">Visual representation of your budget</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={chartType === "pie" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setChartType("pie")}
                      className={
                        chartType === "pie"
                          ? "bg-emerald-500 hover:bg-emerald-600"
                          : "border-white/20 text-white hover:bg-white/10"
                      }
                    >
                      <PieChart className="w-4 h-4 mr-2" />
                      Pie
                    </Button>
                    <Button
                      variant={chartType === "bar" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setChartType("bar")}
                      className={
                        chartType === "bar"
                          ? "bg-emerald-500 hover:bg-emerald-600"
                          : "border-white/20 text-white hover:bg-white/10"
                      }
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Bar
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  {chartType === "pie" ? (
                    <RechartsPie>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </RechartsPie>
                  ) : (
                    <BarChart data={barData}>
                      <XAxis dataKey="category" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="amount" fill="#8884d8" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-white/5 border-white/10 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  Daily Expense Logger
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Track daily expenses with amount and category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border border-white/20 bg-white/5 text-white"
                      modifiers={{
                        hasNote: (date) => {
                          const dateKey = date.toISOString().split("T")[0]
                          return !!expenseNotes[dateKey]
                        },
                      }}
                      modifiersStyles={{
                        hasNote: {
                          fontWeight: "bold",
                          backgroundColor: "rgba(16, 185, 129, 0.3)",
                        },
                      }}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-slate-200 text-lg">Expense for {selectedDate?.toLocaleDateString()}</Label>

                    <div className="space-y-2">
                      <Label htmlFor="amount" className="text-slate-200">
                        Amount Spent
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 font-medium">
                          {getCurrencySymbol()}
                        </span>
                        <Input
                          id="amount"
                          type="number"
                          value={currentAmount}
                          onChange={(e) => setCurrentAmount(Number(e.target.value))}
                          className="backdrop-blur-md bg-white/10 border-white/20 text-white placeholder:text-slate-400 pl-12"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-slate-200">
                        Expense Category
                      </Label>
                      <Select value={currentCategory} onValueChange={setCurrentCategory}>
                        <SelectTrigger className="backdrop-blur-md bg-white/10 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-white/20 text-white">
                          <SelectItem value="Needs">Needs (Essential)</SelectItem>
                          <SelectItem value="Wants">Wants (Discretionary)</SelectItem>
                          <SelectItem value="Savings">Savings/Investment</SelectItem>
                          <SelectItem value="Emergency">Emergency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes" className="text-slate-200">
                        Notes
                      </Label>
                      <Textarea
                        id="notes"
                        value={currentNote}
                        onChange={(e) => setCurrentNote(e.target.value)}
                        placeholder="Add notes about this expense..."
                        className="backdrop-blur-md bg-white/10 border-white/20 text-white placeholder:text-slate-400 min-h-[100px]"
                      />
                    </div>

                    <Button onClick={saveNote} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
                      Save Expense Log
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-white/5 border-white/10 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Monthly Performance
                </CardTitle>
                <CardDescription className="text-slate-300">Daily spending analysis for the month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlySpendingData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis
                      dataKey="day"
                      stroke="#94a3b8"
                      label={{ value: "Day of Month", position: "insideBottom", offset: -5, fill: "#94a3b8" }}
                    />
                    <YAxis
                      stroke="#94a3b8"
                      label={{
                        value: `Amount (${getCurrencySymbol()})`,
                        angle: -90,
                        position: "insideLeft",
                        fill: "#94a3b8",
                      }}
                    />
                    <Tooltip content={<CustomBarTooltip />} />
                    <Legend />
                    <Bar dataKey="dailySpend" fill="#10b981" radius={[4, 4, 0, 0]} name="Daily Spending" />
                  </BarChart>
                </ResponsiveContainer>

                <div className="space-y-3 mt-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Fashal's Discipline Tips
                  </h3>
                  <ul className="space-y-2">
                    {disciplineTips.map((tip, index) => (
                      <li key={index} className="text-slate-300 text-sm flex items-start gap-2">
                        <span className="text-emerald-400 mt-1">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Unified Savings & Habit Tracker Section */}
            <UnifiedSavingsHabitTracker 
              selectedCountry={selectedCountry}
              currencySymbol={currencySymbol}
              savingsGoal={
                selectedRule
                  ? grossIncome * (selectedRule.savings / 100)
                  : 0
              }
              formatCurrency={formatCurrency}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
