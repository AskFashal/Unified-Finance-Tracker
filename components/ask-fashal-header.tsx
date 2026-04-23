"use client"

import { useState, useEffect } from "react"
import { Calendar, Book, Sparkles, ChevronDown } from "lucide-react"

const AskFashalHeader = () => {
  const [todayData, setTodayData] = useState<{ b: string; t: string; i: string } | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const getGlobalSyncData = () => {
      const now = new Date()
      const start = new Date(now.getFullYear(), 0, 0)
      const diff = now.getTime() - start.getTime() + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000
      const oneDay = 1000 * 60 * 60 * 24
      const dayOfYear = Math.floor(diff / oneDay)

      return FASHAL_DATA_SET[(dayOfYear - 1) % 366]
    }

    setTodayData(getGlobalSyncData())
  }, [])

  if (!todayData) return null

  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      <div className="bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 shadow-2xl backdrop-blur-md">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 text-emerald-400">
            <Calendar size={18} />
            <span className="text-sm font-bold uppercase tracking-widest">
              {new Date().toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
            </span>
          </div>
          <div className="px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
            <span className="text-emerald-400 text-xs font-mono">@AskFashal</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Book size={14} />
            <span>
              Source: <strong className="text-slate-200">{todayData.b}</strong>
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight text-pretty">{todayData.t}</h1>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-emerald-500 text-sm font-bold hover:text-emerald-400 transition-all"
          >
            <Sparkles size={16} />
            READ THE "WHY"
            <ChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} size={16} />
          </button>

          {isOpen && (
            <div className="mt-4 p-4 bg-emerald-500/5 rounded-2xl border-l-4 border-emerald-500 animate-in fade-in zoom-in duration-300">
              <p className="text-slate-300 italic text-lg leading-relaxed text-pretty">"{todayData.i}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const FASHAL_DATA_SET = [
  {
    b: "Atomic Habits",
    t: "Identify one 'Financial Cue' and notice it.",
    i: "Habits start with awareness of the cues that trigger spending.",
  },
  {
    b: "Rich Dad Poor Dad",
    t: "Define 'Asset' vs 'Liability' for today's purchases.",
    i: "The rich buy assets; the poor buy liabilities they think are assets.",
  },
  {
    b: "Psychology of Money",
    t: "Write down: 'My financial goals are mine; I am not racing others.'",
    i: "Everyone is playing a different game; don't get tricked by others' luck.",
  },
  {
    b: "I Will Teach You...",
    t: "Call your bank and ask for a fee waiver or lower APR.",
    i: "You don't get what you deserve; you get what you negotiate.",
  },
  {
    b: "Subtle Art...",
    t: "List 3 things you will stop caring about.",
    i: "Freedom comes from choosing what is actually worth your energy.",
  },
  {
    b: "Do Epic Shit",
    t: "Write a 'Failure Log' for one mistake you made this week.",
    i: "Failure is just data. Success is a result of not stopping after failure.",
  },
  {
    b: "The Lean Startup",
    t: "Talk to one person about a business idea today.",
    i: "Don't build in a vacuum; get 'validated learning' from real people.",
  },
  { b: "Deep Work", t: "Schedule 60 minutes of 'No-Phone' time.", i: "Focus is the new 'IQ' in the modern economy." },
  {
    b: "Let's Talk Money",
    t: "Calculate your 'Monthly Survival Cost'.",
    i: "You cannot invest until you know your 'Safety Floor.'",
  },
  {
    b: "Retire Before Mom...",
    t: "Calculate how much $5/day becomes in 30 years.",
    i: "Small amounts, when compounded, create massive freedom.",
  },
  {
    b: "Intelligent Investor",
    t: "Check a company's 'Price to Earnings' ratio.",
    i: "Never buy a stock just because the price is going up.",
  },
  {
    b: "Atomic Habits",
    t: "Use 'Habit Stacking' for your banking app.",
    i: "Tie a new habit to an old one to make it stick.",
  },
  {
    b: "4-Hour Workweek",
    t: "Automate one recurring payment today.",
    i: "Automation removes decisions; fewer decisions = more control.",
  },
  {
    b: "Money: Master the Game",
    t: "Review your credit report for free at annualcreditreport.com.",
    i: "You can't improve what you don't measure.",
  },
  {
    b: "Your Money or Your Life",
    t: "Track your hourly worth vs. hourly spending.",
    i: "Is that coffee worth 12 minutes of your life?",
  },
  {
    b: "The Millionaire Mind",
    t: "List one belief about money you inherited from your parents.",
    i: "Money beliefs are learned, not born. You can reprogram them.",
  },
  {
    b: "Profit First",
    t: "Open a separate 'Pay Yourself First' savings account.",
    i: "Money follows behavior. Change the container, change the behavior.",
  },
  {
    b: "The Simple Path to Wealth",
    t: "Research low-cost index funds (VTSAX, VTIAX).",
    i: "Wealth is simple. Complexity is a salesman's tool.",
  },
  {
    b: "A Random Walk Down...",
    t: "Resist the urge to check your investments today.",
    i: "Frequent checking leads to emotional decisions. Long-term wins.",
  },
  {
    b: "The Psychology of Money",
    t: "Call someone you admire and ask about their first money mistake.",
    i: "Everyone rich started poor. Their journey is your blueprint.",
  },
  {
    b: "Smart People, Money",
    t: "Define your 'FU Number' - the amount that gives you freedom.",
    i: "Money is freedom. Quantify yours.",
  },
  {
    b: "Thinking, Fast and Slow",
    t: "Pause for 5 minutes before any purchase over $100.",
    i: "Impulse is System 1. Strategy is System 2. Use both.",
  },
  {
    b: "The Bogleheads Guide",
    t: "Calculate your ideal asset allocation by age.",
    i: "Time is your greatest tool. Start now, even with small amounts.",
  },
  {
    b: "Common Sense on Mutual...",
    t: "Compare your fund's expense ratio to industry average.",
    i: "1% fees on $100K is $1000/year. Tiny percentages compound.",
  },
  {
    b: "The Intelligent Investor",
    t: "Read Chapter 1 today and reflect on being a 'Business Owner' vs 'Speculator'.",
    i: "Warren Buffett is a businessman. The market is a voting machine short-term, weighing machine long-term.",
  },
  {
    b: "Money Master the Game",
    t: "Calculate your monthly expenses for 1 year without income.",
    i: "Financial security is months of expenses, not years of income.",
  },
  {
    b: "Atomic Habits",
    t: "Stack a financial habit onto an existing habit (e.g., review budget after dinner).",
    i: "Habit stacking is the easiest way to build new behaviors.",
  },
  {
    b: "Rich Dad Poor Dad",
    t: "Identify one 'expense' you can convert into an 'asset.'",
    i: "Assets generate money; expenses consume money. Build assets.",
  },
  {
    b: "Psychology of Money",
    t: "Journal: What would you do with $1M? The answer reveals your true values.",
    i: "Money is a means to an end, not the end itself.",
  },
  {
    b: "The Bogleheads Guide",
    t: "Set up automatic rebalancing for your portfolio quarterly.",
    i: "Rebalancing forces you to 'buy low, sell high'—the opposite of human nature.",
  },
  {
    b: "Smart Money, Smart Kids",
    t: "Have a money conversation with a child in your life.",
    i: "The best financial education happens early and often.",
  },
  {
    b: "The Simple Path to Wealth",
    t: "Calculate your Net Worth today and set a goal for next year.",
    i: "Measurement creates motivation. Track it monthly.",
  },
  {
    b: "Profit First",
    t: "Create a 'Moneybag' fund for irregular expenses.",
    i: "Irregular expenses derail budgets. Plan for them.",
  },
  {
    b: "I Will Teach You...",
    t: "Identify one monthly subscription you don't use and cancel it.",
    i: "Subscriptions are designed to be forgotten. Don't let them.",
  },
  {
    b: "Your Money or Your Life",
    t: "Calculate your 'hourly freedom rate'—the amount you need per hour to be free.",
    i: "Time is the only non-renewable resource. Spend it wisely.",
  },
  {
    b: "The Millionaire Mind",
    t: "Read about one self-made millionaire today.",
    i: "Millionaires think differently. Study their thinking, not just their money.",
  },
  {
    b: "Deep Work",
    t: "Identify one high-leverage skill that could increase your income.",
    i: "Money follows skill. Invest in yourself first.",
  },
  {
    b: "4-Hour Workweek",
    t: "List 3 things you could delegate or eliminate.",
    i: "Complexity is a wealth killer. Simplify ruthlessly.",
  },
  {
    b: "The Psychology of Money",
    t: "Admit one financial mistake without judgment.",
    i: "Self-awareness is the first step to change.",
  },
  {
    b: "Money: Master the Game",
    t: "Review your insurance coverage (auto, health, life).",
    i: "Insurance is the only financial product you hope you never use.",
  },
  {
    b: "Atomic Habits",
    t: "Create a 2-minute money ritual (check accounts, review budget).",
    i: "Consistency beats intensity. 2 minutes daily beats 2 hours yearly.",
  },
  {
    b: "Rich Dad Poor Dad",
    t: "Ask yourself: 'Do I own this, or does it own me?'",
    i: "True wealth is freedom. Debt is slavery.",
  },
  {
    b: "The Bogleheads Guide",
    t: "Review your portfolio and ensure no single investment is >10% of total.",
    i: "Concentration is risk. Diversification is peace of mind.",
  },
  {
    b: "Let's Talk Money",
    t: "Calculate your 'Runway'—how many months can you survive without income?",
    i: "Runway is security. Build it before you need it.",
  },
  {
    b: "The Simple Path to Wealth",
    t: "Increase one investment contribution by 1% this month.",
    i: "Small increases compound into massive wealth.",
  },
  {
    b: "Profit First",
    t: "Allocate a percentage to a 'Celebration Fund' for wins.",
    i: "Celebrating wins is as important as planning ahead.",
  },
  {
    b: "Smart People, Money",
    t: "Identify one cognitive bias that affects your financial decisions.",
    i: "The more you're aware of biases, the better your decisions.",
  },
  {
    b: "Psychology of Money",
    t: "Write a letter to your future self (10 years from now).",
    i: "Clarity on the future motivates action today.",
  },
  {
    b: "The Intelligent Investor",
    t: "Review a company's annual report (10-K) like a business owner would.",
    i: "Investing is business ownership. Act like it.",
  },
  {
    b: "4-Hour Workweek",
    t: "Identify one revenue stream you could create.",
    i: "Diversified income is more stable than single income.",
  },
  {
    b: "Your Money or Your Life",
    t: "Calculate the true cost of your job (commute, clothes, stress).",
    i: "Your real hourly wage might be much lower than you think.",
  },
  {
    b: "The Millionaire Mind",
    t: "Adopt one millionaire habit this week.",
    i: "Millionaires read, network, and act. Do all three.",
  },
  {
    b: "Money: Master the Game",
    t: "List your top 3 fears about money and research each one.",
    i: "Knowledge dissolves fear.",
  },
  {
    b: "Atomic Habits",
    t: "Replace one money-draining habit with a money-building habit.",
    i: "Habit replacement is more effective than habit elimination.",
  },
  {
    b: "Rich Dad Poor Dad",
    t: "Spend 1 hour learning about tax strategies for your situation.",
    i: "Tax planning is not optional. It's mandatory for wealth.",
  },
  {
    b: "The Bogleheads Guide",
    t: "Calculate your 'Trinity Number'—25x your annual expenses.",
    i: "At this number, you can retire and live off 4% annually.",
  },
  {
    b: "Psychology of Money",
    t: "Journal about your earliest money memory.",
    i: "Where we come from shapes where we go.",
  },
  {
    b: "The Simple Path to Wealth",
    t: "Calculate your 'Lean FIRE' number—bare minimum to survive.",
    i: "Knowing your floor gives you courage.",
  },
  {
    b: "Profit First",
    t: "Review your expenses and cut the top 3 spending categories by 10%.",
    i: "Small cuts compound. Save $100/month = $1200/year.",
  },
  {
    b: "I Will Teach You...",
    t: "Ask 3 people how they negotiate their salary.",
    i: "Salary negotiation is the fastest way to more money.",
  },
  {
    b: "Smart Money, Smart Kids",
    t: "Teach someone the concept of 'compound interest' today.",
    i: "Spreading financial knowledge is the greatest gift.",
  },
  {
    b: "The Intelligent Investor",
    t: "Analyze a stock you own (or would own) using fundamental analysis.",
    i: "Understanding what you own makes you a better investor.",
  },
  {
    b: "Deep Work",
    t: "Schedule 90-minute focused blocks for financial planning.",
    i: "Financial success requires deep, focused work.",
  },
  {
    b: "4-Hour Workweek",
    t: "Outsource one task that drains your time and energy.",
    i: "Your time is worth more than minimum wage tasks.",
  },
  {
    b: "Your Money or Your Life",
    t: "Define 'Enough' for yourself. Not more, not less—enough.",
    i: "Enough is freedom. More is a treadmill.",
  },
  {
    b: "The Millionaire Mind",
    t: "Study one sector where millionaires are concentrating wealth.",
    i: "Follow smart money. It often leads to opportunity.",
  },
  {
    b: "Money: Master the Game",
    t: "Review your investment allocations across all accounts.",
    i: "Coordination is key. Your retirement and taxable accounts should work together.",
  },
  {
    b: "Atomic Habits",
    t: "Link a financial win to an enjoyable reward.",
    i: "Positive reinforcement builds lasting habits.",
  },
  {
    b: "Rich Dad Poor Dad",
    t: "Write down: What would I do if I didn't fear failing?",
    i: "Fear is the biggest barrier to wealth. Face it.",
  },
  {
    b: "Psychology of Money",
    t: "Calculate how much you could save if you stopped one habit.",
    i: "Awareness precedes change.",
  },
  {
    b: "The Bogleheads Guide",
    t: "Review your fund performance against its benchmark.",
    i: "Underperformance signals the need for a change.",
  },
  {
    b: "Let's Talk Money",
    t: "Define your 'Enough Line'—income level where you feel secure.",
    i: "Beyond enough is anxiety, not security.",
  },
  {
    b: "The Simple Path to Wealth",
    t: "Increase your savings rate by 1% of income this month.",
    i: "Small rate increases compound into massive wealth.",
  },
  {
    b: "Profit First",
    t: "Celebrate a financial win (paid off debt, saved milestone amount).",
    i: "Celebrating builds momentum.",
  },
  {
    b: "Smart People, Money",
    t: "Identify one financial goal that excites you.",
    i: "Excitement drives action. Find yours.",
  },
  {
    b: "The Intelligent Investor",
    t: "Read about a company's competitive advantages (moat).",
    i: "Great investments have durable competitive advantages.",
  },
  {
    b: "4-Hour Workweek",
    t: "List 3 things you're doing that nobody asked you to do.",
    i: "Eliminate unnecessary work before everything else.",
  },
  {
    b: "Your Money or Your Life",
    t: "Calculate your 'Freedom Number'—the amount that sets you free.",
    i: "Freedom is mathematical. Calculate yours.",
  },
  {
    b: "The Millionaire Mind",
    t: "Adopt the millionaire's 80/20 thinking on your finances.",
    i: "80% of results come from 20% of efforts. Find your 20%.",
  },
  {
    b: "Money: Master the Game",
    t: "Review your spending by category and challenge each one.",
    i: "Every dollar should earn its place in your budget.",
  },
  {
    b: "Atomic Habits",
    t: "Create an environmental cue for financial discipline (sticky note, alarm).",
    i: "Environment shapes behavior more than willpower.",
  },
  {
    b: "Rich Dad Poor Dad",
    t: "List one belief about money that might be limiting you.",
    i: "Beliefs create reality. Change limiting beliefs.",
  },
  {
    b: "Psychology of Money",
    t: "Reflect on how your peer group influences your spending.",
    i: "Spend time with people who challenge you financially.",
  },
  {
    b: "The Bogleheads Guide",
    t: "Rebalance one investment category that's drifted from target.",
    i: "Rebalancing is buying low and selling high automatically.",
  },
  {
    b: "Let's Talk Money",
    t: "Create a 'Money Date' with your partner (if applicable) monthly.",
    i: "Communication prevents financial divorce.",
  },
  {
    b: "The Simple Path to Wealth",
    t: "Invest any 'found money' (bonus, tax refund, gift).",
    i: "Windfalls compound into wealth if invested.",
  },
  {
    b: "Profit First",
    t: "Allocate a small percentage to a 'Play Fund' for guilt-free spending.",
    i: "Permission to spend prevents binging.",
  },
  {
    b: "Smart Money, Smart Kids",
    t: "Create a financial goal with a visual reminder (poster, photo).",
    i: "Visual reminders keep motivation high.",
  },
  {
    b: "I Will Teach You...",
    t: "Negotiate one recurring bill (internet, phone, insurance).",
    i: "Negotiation saves thousands annually.",
  },
  {
    b: "The Intelligent Investor",
    t: "Study the difference between a stock and a bond.",
    i: "Asset class understanding is foundational to investing.",
  },
  {
    b: "Deep Work",
    t: "Spend 2 hours on one significant financial project.",
    i: "Deep work on finances yields disproportionate returns.",
  },
  {
    b: "4-Hour Workweek",
    t: "Create a 'Not-To-Do' list for financial decisions.",
    i: "Knowing what not to do is as important as what to do.",
  },
  {
    b: "Your Money or Your Life",
    t: "Journal about the relationship between time and money.",
    i: "Understanding this relationship changes everything.",
  },
  {
    b: "The Millionaire Mind",
    t: "Interview a wealthy person about their financial habits.",
    i: "Millionaires are often happy to share their secrets.",
  },
  {
    b: "Money: Master the Game",
    t: "Review your 'Money Story'—the narrative you tell about yourself.",
    i: "Narratives shape behavior. Edit your story.",
  },
  {
    b: "Atomic Habits",
    t: "Join a financial community (online or in-person).",
    i: "Community accelerates change and accountability.",
  },
  {
    b: "Rich Dad Poor Dad",
    t: "Distinguish between 'Good Debt' and 'Bad Debt' in your life.",
    i: "Not all debt is created equal. Know the difference.",
  },
  {
    b: "Psychology of Money",
    t: "Reflect on your parents' relationship with money.",
    i: "Your parents' money story wrote your first chapter.",
  },
  {
    b: "The Bogleheads Guide",
    t: "Calculate your portfolio's weighted expense ratio.",
    i: "Expense ratios directly reduce returns. Keep them low.",
  },
  {
    b: "Let's Talk Money",
    t: "Define your 'Risk Tolerance' honestly, not theoretically.",
    i: "Risk tolerance changes with age, wealth, and life events.",
  },
  {
    b: "The Simple Path to Wealth",
    t: "Research one investment option you're unfamiliar with.",
    i: "Education is the antidote to investment fear.",
  },
  {
    b: "Profit First",
    t: "Allocate a percentage to 'Systems Investment' for financial tools.",
    i: "Tools amplify effort. Invest in good ones.",
  },
  {
    b: "Smart People, Money",
    t: "Calculate your 'Prosperity Index'—savings rate + investment return.",
    i: "Track this metric. It predicts wealth more than income.",
  },
  {
    b: "The Intelligent Investor",
    t: "Read about a company's earnings report and understand the key metrics.",
    i: "Understanding financials makes you a better investor.",
  },
  {
    b: "4-Hour Workweek",
    t: "Eliminate one commitment that doesn't align with your values.",
    i: "Every 'yes' to something is a 'no' to something else.",
  },
  {
    b: "Your Money or Your Life",
    t: "Calculate your 'Income Replacement Ratio'—retirement income vs. working income.",
    i: "Knowing this number makes retirement planning concrete.",
  },
  {
    b: "The Millionaire Mind",
    t: "Start one income-generating project this month.",
    i: "Millionaires build multiple income streams. So can you.",
  },
  {
    b: "Money: Master the Game",
    t: "Review your tax return and identify optimization opportunities.",
    i: "Taxes are often the largest expense. Optimize them.",
  },
  {
    b: "Atomic Habits",
    t: "Create a '30-Day Money Challenge' for yourself.",
    i: "30 days of focus compound into years of wealth.",
  },
  {
    b: "Rich Dad Poor Dad",
    t: "Invest in yourself (course, book, mentor) this month.",
    i: "ROI on self-investment is unlimited.",
  },
  {
    b: "Psychology of Money",
    t: "Practice saying 'no' to one financial temptation.",
    i: "'No' is the most powerful financial word.",
  },
  {
    b: "The Bogleheads Guide",
    t: "Analyze your asset allocation for its risk-adjusted returns.",
    i: "Good allocation balances growth with sleep.",
  },
  {
    b: "Let's Talk Money",
    t: "Create a 'Vision Board' for your financial goals.",
    i: "Visualization accelerates manifestation.",
  },
  {
    b: "The Simple Path to Wealth",
    t: "Automate your savings before you see the money.",
    i: "Automation removes willpower from the equation.",
  },
  {
    b: "Profit First",
    t: "Review your profit margins on time (is your hourly rate fair?).",
    i: "Time is currency. Price it accordingly.",
  },
  {
    b: "Smart Money, Smart Kids",
    t: "Teach a child about the power of compound interest.",
    i: "Starting early is the secret to wealth.",
  },
  {
    b: "I Will Teach You...",
    t: "Research salary benchmarks for your role and experience.",
    i: "Ignorance costs money. Know your market value.",
  },
  {
    b: "The Intelligent Investor",
    t: "Understand the concept of 'Intrinsic Value' vs. Market Price.",
    i: "Intrinsic value is what you pay for. Market price is what you pay.",
  },
  {
    b: "Deep Work",
    t: "Block 2 hours monthly for 'Money Architecture' planning.",
    i: "Financial architecture is the skeleton of wealth.",
  },
  {
    b: "4-Hour Workweek",
    t: "Create a 'Low-Information Diet' for financial news.",
    i: "Too much financial news creates noise, not wisdom.",
  },
  {
    b: "Your Money or Your Life",
    t: "Calculate your 'Real Hourly Wage' accounting for all job costs.",
    i: "Awareness of true wages changes career decisions.",
  },
  {
    b: "The Millionaire Mind",
    t: "Attend one financial seminar or webinar this month.",
    i: "Continuous learning is the millionaire's habit.",
  },
  {
    b: "Money: Master the Game",
    t: "Review your insurance needs and adjust coverage.",
    i: "Insurance is wealth protection. Don't skimp on it.",
  },
  {
    b: "Atomic Habits",
    t: "Create a 'Finance Scorecard' to track weekly progress.",
    i: "What gets measured gets managed.",
  },
  {
    b: "Rich Dad Poor Dad",
    t: "Analyze one 'opportunity' you declined and why.",
    i: "Missed opportunities teach us about our risk tolerance.",
  },
  { b: "Psychology of Money", t: "Journal about your biggest financial fear.", i: "Named fears have less power." },
  {
    b: "The Bogleheads Guide",
    t: "Review your portfolio's historical performance during downturns.",
    i: "Understanding volatility prepares you for market crashes.",
  },
  {
    b: "Let's Talk Money",
    t: "Calculate your 'Retirement Date' if you maintain current savings rate.",
    i: "A concrete date makes retirement real.",
  },
  {
    b: "The Simple Path to Wealth",
    t: "Invest in dividend-paying assets that align with your values.",
    i: "Dividend income is passive income. Build it.",
  },
  {
    b: "Profit First",
    t: "Allocate a percentage to a 'Healthcare Fund' for unexpected medical costs.",
    i: "Medical emergencies are the #1 reason for bankruptcy.",
  },
  {
    b: "Smart People, Money",
    t: "Identify one expensive habit and calculate its annual cost.",
    i: "$3/day is $1095/year. What expensive habits do you have?",
  },
  {
    b: "The Intelligent Investor",
    t: "Compare the investment returns of active vs. passive management.",
    i: "Data shows passive investors typically outperform active ones.",
  },
  {
    b: "4-Hour Workweek",
    t: "Batch similar tasks to improve focus and efficiency.",
    i: "Batching reduces context switching and increases productivity.",
  },
  {
    b: "Your Money or Your Life",
    t: "Define 'Work' vs. 'Purpose' and see if they align.",
    i: "The best wealth-building happens when work is purpose.",
  },
  {
    b: "The Millionaire Mind",
    t: "Study one profitable business and understand its model.",
    i: "Business models are blueprints for wealth.",
  },
  {
    b: "Money: Master the Game",
    t: "Calculate your 'Wealth Velocity'—how fast you're building wealth.",
    i: "Velocity matters. Accelerate it.",
  },
  {
    b: "Atomic Habits",
    t: "Create a 'Decision Log' for financial choices to improve intuition.",
    i: "Decision logs reveal patterns and improve future choices.",
  },
  {
    b: "Rich Dad Poor Dad",
    t: "Identify one 'asset' you own and track its growth.",
    i: "Asset tracking builds ownership mentality.",
  },
  {
    b: "Psychology of Money",
    t: "Practice gratitude for one financial blessing.",
    i: "Gratitude shifts scarcity mindset to abundance.",
  },
  {
    b: "The Bogleheads Guide",
    t: "Calculate your 'Safe Withdrawal Rate'—4% rule for retirement.",
    i: "This number determines your financial freedom.",
  },
  {
    b: "Let's Talk Money",
    t: "Create a 'Money Manifesto'—your financial values and goals.",
    i: "Written manifestos prevent deviation from your path.",
  },
  {
    b: "The Simple Path to Wealth",
    t: "Research one tax-advantaged account (401k, IRA, HSA).",
    i: "Tax-advantaged accounts are wealth-building superchargers.",
  },
  {
    b: "Profit First",
    t: "Review your accounting system and ensure it reflects reality.",
    i: "Bad accounting leads to bad decisions.",
  },
  {
    b: "Smart Money, Smart Kids",
    t: "Create a 'Money Map'—your financial overview.",
    i: "A map prevents getting lost in the financial wilderness.",
  },
  {
    b: "I Will Teach You...",
    t: "Ask your mentor about their biggest financial mistake.",
    i: "Mentors' mistakes become your wisdom.",
  },
  {
    b: "The Intelligent Investor",
    t: "Understand 'Price-to-Book Ratio' and why it matters.",
    i: "Valuation metrics separate investors from speculators.",
  },
  {
    b: "Deep Work",
    t: "Spend 3 hours on financial planning without distractions.",
    i: "Deep financial work compounds into exponential returns.",
  },
  {
    b: "4-Hour Workweek",
    t: "Identify one role you could delegate or hire out.",
    i: "Hiring is an investment in your freedom.",
  },
  {
    b: "Your Money or Your Life",
    t: "Calculate your 'Sustainability Index'—how long savings last at current spend.",
    i: "This index reveals if your current lifestyle is sustainable.",
  },
  {
    b: "The Millionaire Mind",
    t: "Read one autobiography of a self-made millionaire.",
    i: "Autobiographies reveal mindset shifts, not just tactics.",
  },
  {
    b: "Money: Master the Game",
    t: "Review your financial goals quarterly and adjust.",
    i: "Goals should evolve with your circumstances.",
  },
  {
    b: "Atomic Habits",
    t: "Create a 'Morning Money Ritual' (5 minutes) for daily wins.",
    i: "Morning rituals set the tone for the entire day.",
  },
  {
    b: "Rich Dad Poor Dad",
    t: "Calculate your 'Debt-to-Asset Ratio' and work to improve it.",
    i: "This ratio reveals your financial health at a glance.",
  },
  {
    b: "Psychology of Money",
    t: "Identify one financial identity that limits you.",
    i: "'I'm bad with money' is an identity, not destiny.",
  },
  {
    b: "The Bogleheads Guide",
    t: "Backtest your investment strategy during the 2008 recession.",
    i: "Historical stress tests reveal true risk tolerance.",
  },
  {
    b: "Let's Talk Money",
    t: "Create a 'Money Mastermind' group with like-minded individuals.",
    i: "Masterminds accelerate financial growth exponentially.",
  },
  {
    b: "The Simple Path to Wealth",
    t: "Calculate your 'Withdrawal Sustainability'—can you retire comfortably?",
    i: "This is the ultimate financial security question.",
  },
  {
    b: "Profit First",
    t: "Allocate a percentage to 'Give Back' and donate monthly.",
    i: "Giving builds gratitude and community.",
  },
  {
    b: "Smart People, Money",
    t: "Identify one financial blind spot and research it.",
    i: "Blind spots are the sneakiest wealth killers.",
  },
  {
    b: "The Intelligent Investor",
    t: "Study market cycles and where we are in the current cycle.",
    i: "Cycle awareness prevents panic and enables opportunity.",
  },
  {
    b: "4-Hour Workweek",
    t: "Create a 'Time Audit' to see where hours actually go.",
    i: "Time audits reveal where to optimize first.",
  },
  {
    b: "Your Money or Your Life",
    t: "Define your 'Financial Independence'—what does freedom look like?",
    i: "Freedom is personal. Define it for yourself.",
  },
  {
    b: "The Millionaire Mind",
    t: "Identify one skill that wealthy people have that you lack.",
    i: "Skills are learned. Learn wealth-building skills.",
  },
  {
    b: "Money: Master the Game",
    t: "Calculate your 'Burn Rate'—how much money you consume monthly.",
    i: "Knowing your burn rate is essential to sustainability.",
  },
  {
    b: "Atomic Habits",
    t: "Stack a financial check-in into an existing daily routine.",
    i: "Stacking makes habits automatic, not optional.",
  },
  {
    b: "Rich Dad Poor Dad",
    t: "Write one financial affirmation and repeat it daily.",
    i: "Affirmations rewire your money mindset.",
  },
  {
    b: "Psychology of Money",
    t: "Reflect on your biggest financial win and what enabled it.",
    i: "Success patterns reveal your strengths.",
  },
  {
    b: "The Bogleheads Guide",
    t: "Calculate your 'Risk-Adjusted Returns' for better performance clarity.",
    i: "Returns without considering risk is incomplete analysis.",
  },
  {
    b: "Let's Talk Money",
    t: "Plan a financial date with yourself monthly (non-negotiable).",
    i: "Monthly dates prevent financial drift.",
  },
  {
    b: "The Simple Path to Wealth",
    t: "Increase one investment contribution by 5% this month.",
    i: "5% increases compound into massive changes over time.",
  },
  {
    b: "Profit First",
    t: "Create a 'Rainy Day Fund' separate from your emergency fund.",
    i: "Multiple safety nets provide true peace of mind.",
  },
  {
    b: "Smart Money, Smart Kids",
    t: "Celebrate a financial milestone with someone you love.",
    i: "Shared wins build community and motivation.",
  },
  {
    b: "I Will Teach You...",
    t: "Research the salary for your dream role and create a plan.",
    i: "Dreams with plans become reality.",
  },
  {
    b: "The Intelligent Investor",
    t: "Understand the concept of 'Margin of Safety' in investing.",
    i: "Margin of Safety is the greatest investment principle.",
  },
  {
    b: "Deep Work",
    t: "Write a financial plan for the next 3 months.",
    i: "Planning without action is daydreaming. Add accountability.",
  },
  {
    b: "4-Hour Workweek",
    t: "Negotiate one significant expense this month (rent, insurance, etc.).",
    i: "Negotiation is a skill. Practice it relentlessly.",
  },
  {
    b: "Your Money or Your Life",
    t: "Calculate your 'Time Affluence'—how much time freedom you have.",
    i: "Time affluence is more valuable than financial affluence.",
  },
  {
    b: "The Millionaire Mind",
    t: "Adopt one millionaire's daily routine for a month.",
    i: "Routines compound into results.",
  },
  {
    b: "Money: Master the Game",
    t: "Review your portfolio allocation against your risk tolerance quiz.",
    i: "Misalignment between risk tolerance and allocation causes panic.",
  },
  {
    b: "Atomic Habits",
    t: "Track one financial habit for 30 days and note improvements.",
    i: "Tracking creates accountability and visibility.",
  },
  {
    b: "Rich Dad Poor Dad",
    t: "Analyze one major purchase decision from your past.",
    i: "Past purchases teach us about future decisions.",
  },
  {
    b: "Psychology of Money",
    t: "Practice one 'no' to a financial temptation and note how you feel.",
    i: "'No' becomes easier with practice.",
  },
  {
    b: "The Bogleheads Guide",
    t: "Rebalance your portfolio to match your target allocation.",
    i: "Rebalancing is the most important portfolio maintenance task.",
  },
  {
    b: "Let's Talk Money",
    t: "Create a 'Money Template' for recurring financial tasks.",
    i: "Templates reduce friction and increase consistency.",
  },
  {
    b: "The Simple Path to Wealth",
    t: "Calculate how much you need monthly to sustain your desired lifestyle.",
    i: "This number is your North Star for financial planning.",
  },
  {
    b: "Profit First",
    t: "Review your profit margins (personal income divided by hours).",
    i: "Low margins reveal time to delegate or raise rates.",
  },
  {
    b: "Smart People, Money",
    t: "Identify one financial bad habit and commit to breaking it.",
    i: "Breaking one habit unlocks wealth.",
  },
  {
    b: "The Intelligent Investor",
    t: "Study dividend history of a stock you're considering.",
    i: "Dividend history reveals company stability.",
  },
  {
    b: "4-Hour Workweek",
    t: "Create a 'Perfect Day' timeline and work backward to make it happen.",
    i: "Perfect days don't happen; they're designed.",
  },
  {
    b: "Your Money or Your Life",
    t: "Reflect on your most expensive regret and what you learned.",
    i: "Regrets are tuition in life's school.",
  },
  {
    b: "The Millionaire Mind",
    t: "Identify one opportunity you see that others don't.",
    i: "Millionaires see opportunities everywhere.",
  },
  {
    b: "Money: Master the Game",
    t: "Calculate your 'Financial Stress Index' (1-10) and work to reduce it.",
    i: "Financial stress impacts health. Address it.",
  },
  {
    b: "Atomic Habits",
    t: "Create a 'Money Victory Journal' and write in it weekly.",
    i: "Recording victories builds momentum.",
  },
  {
    b: "Rich Dad Poor Dad",
    t: "Write down one limiting belief about money and challenge it.",
    i: "Challenging beliefs rewires your money mindset.",
  },
  {
    b: "Psychology of Money",
    t: "Interview someone about their relationship with money and learn.",
    i: "Every person's money story teaches something.",
  },
  {
    b: "The Bogleheads Guide",
    t: "Calculate your 'Sequence of Returns Risk' for retirement.",
    i: "Return order matters for retirees. Know your risk.",
  },
  {
    b: "Let's Talk Money",
    t: "Create a '5-Year Financial Roadmap' with milestones.",
    i: "Roadmaps prevent wandering.",
  },
  {
    b: "The Simple Path to Wealth",
    t: "Invest any annual bonus you receive.",
    i: "Bonuses are wealth-building accelerators.",
  },
  {
    b: "Profit First",
    t: "Calculate your 'Ideal Income'—the amount that enables your best self.",
    i: "Too much income can be toxic. Know your ideal.",
  },
  {
    b: "Smart Money, Smart Kids",
    t: "Create a visual representation of your financial goals.",
    i: "Visibility accelerates achievement.",
  },
  {
    b: "I Will Teach You...",
    t: "Teach someone else what you learned about money this month.",
    i: "Teaching deepens understanding.",
  },
  {
    b: "The Intelligent Investor",
    t: "Understand the power of compounding on a 50-year timeline.",
    i: "Fifty years of compounding creates dynasties.",
  },
  {
    b: "Deep Work",
    t: "Write a detailed financial plan that covers 5 years.",
    i: "Detailed plans prevent drift and enable focus.",
  },
  {
    b: "4-Hour Workweek",
    t: "Identify your '80/20 Customers'—the 20% generating 80% of value.",
    i: "Focus on high-value customers and let low-value ones go.",
  },
  {
    b: "Your Money or Your Life",
    t: "Create a 'Bucket List Budget'—money needed for dream experiences.",
    i: "Pricing dreams makes them achievable.",
  },
  {
    b: "The Millionaire Mind",
    t: "Study one business model that fascinates you.",
    i: "Business models are profitable when understood deeply.",
  },
  {
    b: "Money: Master the Game",
    t: "Calculate your 'Financial Stability Score'—on a scale of 1-10.",
    i: "Know your number to know where to focus.",
  },
  {
    b: "Atomic Habits",
    t: "Create a 'Money Mantra' and repeat it daily for 30 days.",
    i: "Mantras reprogram subconscious beliefs.",
  },
  {
    b: "Rich Dad Poor Dad",
    t: "Analyze one business opportunity and assess its viability.",
    i: "Business acumen is wealth-building superpower.",
  },
  {
    b: "Psychology of Money",
    t: "Journal about your biggest financial fear and create a plan.",
    i: "Plans eliminate fear.",
  },
  {
    b: "The Bogleheads Guide",
    t: "Test your portfolio's resilience through a historical market crash scenario.",
    i: "Resilience is more important than returns.",
  },
  {
    b: "Let's Talk Money",
    t: "Create a 'Wealth Vision'—what does your ideal financial future look like?",
    i: "Vision pulls you forward.",
  },
  {
    b: "The Simple Path to Wealth",
    t: "Calculate your 'Investment Success Rate'—% of time on track.",
    i: "Consistency beats perfection.",
  },
  {
    b: "Profit First",
    t: "Allocate a percentage to a 'Future Fund' for next year's goals.",
    i: "Planning ahead prevents financial stress.",
  },
  {
    b: "Smart Money, Smart Kids",
    t: "Identify one person who is financially free and study their path.",
    i: "Blueprints exist. Find them.",
  },
  {
    b: "The Intelligent Investor",
    t: "Understand the difference between 'Value' and 'Growth' investing.",
    i: "Different strategies suit different people. Know which is you.",
  },
  {
    b: "4-Hour Workweek",
    t: "Create a 'Freedom Metric'—what does financial freedom look like?",
    i: "Metrics enable tracking and accountability.",
  },
  {
    b: "Your Money or Your Life",
    t: "Calculate your 'Opportunity Cost'—what are you giving up?",
    i: "Every choice has a cost. Know what you're sacrificing.",
  },
  {
    b: "The Millionaire Mind",
    t: "Identify one skill millionaires have that you're working to develop.",
    i: "Skill development is wealth development.",
  },
  {
    b: "Money: Master the Game",
    t: "Review your spending against your values—are they aligned?",
    i: "Spending misalignment creates financial stress.",
  },
  {
    b: "Atomic Habits",
    t: "Create a '90-Day Money Challenge' with a specific focus.",
    i: "90 days of focus creates lasting change.",
  },
  {
    b: "Rich Dad Poor Dad",
    t: "Calculate your 'Financial Independence Number'—monthly income needed.",
    i: "This number is your North Star.",
  },
  {
    b: "Psychology of Money",
    t: "Celebrate one financial achievement, no matter how small.",
    i: "Celebration builds momentum.",
  },
  {
    b: "The Bogleheads Guide",
    t: "Calculate your 'Safe Sequence Number'—retire safely at X age.",
    i: "Sequence planning removes retirement anxiety.",
  },
  {
    b: "Let's Talk Money",
    t: "Write a 'Money Letter' to your future self (20 years from now).",
    i: "This letter motivates action today.",
  },
  { b: "CONGRATULATIONS", t: "EXECUTE YOUR 2026 PLAN.", i: "The habit is now part of your DNA. Go do epic shit." },
]

export default AskFashalHeader
