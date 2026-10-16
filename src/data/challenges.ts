export type ChallengeDay = {
  activityId: string
  title: string
  prompt: string
  reflection: string
}

export type Challenge = {
  id: string
  title: string
  theme: string
  summary: string
  purpose: string
  badge: string
  days: ChallengeDay[]
}

export const challengeCatalogVersion = 1

export const challenges: Challenge[] = [
  {
    id: 'intentional-moments',
    title: 'Intentional Moments',
    theme: 'EVERYDAY CONNECTION',
    summary: 'Make a little more room for meaningful moments in ordinary days.',
    purpose: 'A gentle seven-part practice for noticing and choosing small moments of connection. No special plans or physical contact required.',
    badge: 'The Moment Maker',
    days: [
      { activityId: 'intentional-moments-notice-what-is-here', title: 'Notice what is already here', prompt: 'Take a moment to notice one ordinary thing that felt good today. You can keep it to yourself or share it if you want.', reflection: 'What did you notice?' },
      { activityId: 'intentional-moments-make-a-little-space', title: 'Make a little space', prompt: 'Choose one small pause in your day. Take a breath, look around, and let yourself be where you are.', reflection: 'How did the pause feel?' },
      { activityId: 'intentional-moments-offer-your-attention', title: 'Offer your attention', prompt: 'Give someone or something you care about a few minutes of your undivided attention, in a way that feels comfortable.', reflection: 'What held your attention?' },
      { activityId: 'intentional-moments-choose-a-small-kindness', title: 'Choose a small kindness', prompt: 'Think of one kind gesture that would feel natural today. It can be for yourself or someone else.', reflection: 'What kind of care felt right?' },
      { activityId: 'intentional-moments-enjoy-something-familiar', title: 'Enjoy something familiar', prompt: 'Return to a small routine, place, or activity you enjoy. Notice one detail you might usually pass by.', reflection: 'What stood out this time?' },
      { activityId: 'intentional-moments-share-a-quiet-moment', title: 'Share a quiet moment', prompt: 'If it feels welcome, invite someone to share a calm moment. Being alongside each other is enough; conversation is optional.', reflection: 'What made the moment comfortable?' },
      { activityId: 'intentional-moments-carry-one-thing-forward', title: 'Carry one thing forward', prompt: 'Choose one small moment from this week you would like to make room for again. There is no need to turn it into a rule.', reflection: 'What would you like more room for?' },
    ],
  },
  {
    id: 'better-conversations',
    title: 'Better Conversations',
    theme: 'COMMUNICATION',
    summary: 'Practice listening, curiosity, and clear, kind communication.',
    purpose: 'Seven low-pressure prompts for expressing yourself and listening. Sharing answers is always optional; a pause or pass is a complete response.',
    badge: 'The Good Listener',
    days: [
      { activityId: 'better-conversations-listen-without-fixing', title: 'Listen without fixing', prompt: 'If someone wants to talk, ask whether they would like listening, ideas, or simply company. They can also choose not to talk.', reflection: 'What kind of support feels good to receive?' },
      { activityId: 'better-conversations-ask-an-open-question', title: 'Ask an open question', prompt: 'Consider an open question about something ordinary that interests the other person. They can answer as much or as little as they like.', reflection: 'What makes a question feel inviting?' },
      { activityId: 'better-conversations-say-one-thing-clearly', title: 'Say one thing clearly', prompt: 'Practice naming one small preference or need in a kind, direct way. You can rehearse privately instead of sharing it.', reflection: 'What helps you feel heard?' },
      { activityId: 'better-conversations-check-your-understanding', title: 'Check your understanding', prompt: 'When listening, try reflecting back the gist of what you heard. Ask if you understood; accept a correction without defending.', reflection: 'What helps a conversation feel safe?' },
      { activityId: 'better-conversations-make-room-for-a-pause', title: 'Make room for a pause', prompt: 'Let a conversation have a quiet moment. You do not need to fill every pause or reach an answer today.', reflection: 'How do you feel about quiet pauses?' },
      { activityId: 'better-conversations-notice-a-boundary', title: 'Notice a boundary', prompt: 'Think of one boundary that helps you feel comfortable. You may keep it private; no explanation is owed.', reflection: 'What helps you respect your own pace?' },
      { activityId: 'better-conversations-choose-how-to-reconnect', title: 'Choose how to reconnect', prompt: 'Choose a small way to continue a conversation another time, or decide that today is enough. Either choice is valid.', reflection: 'What would make a next conversation feel welcome?' },
    ],
  },
  {
    id: 'everyday-appreciation',
    title: 'Everyday Appreciation',
    theme: 'APPRECIATION',
    summary: 'Notice the small things you value, without turning gratitude into an obligation.',
    purpose: 'A seven-part practice in noticing care, effort, and qualities you appreciate. You can do it privately, with a partner, or not at all on a day that does not suit you.',
    badge: 'The Noticer',
    days: [
      { activityId: 'everyday-appreciation-notice-an-effort', title: 'Notice an effort', prompt: 'Notice an effort someone made today, including one you made for yourself. Appreciation does not have to be spoken aloud.', reflection: 'What effort did you notice?' },
      { activityId: 'everyday-appreciation-value-a-small-quality', title: 'Value a small quality', prompt: 'Think of a quality you value in yourself or someone you care about. Keep it private unless sharing feels welcome.', reflection: 'Which quality came to mind?' },
      { activityId: 'everyday-appreciation-remember-a-shared-laugh', title: 'Remember a shared laugh', prompt: 'Recall a light moment that made you smile. If you are with someone, you can invite them to remember one too.', reflection: 'What detail brings the smile back?' },
      { activityId: 'everyday-appreciation-appreciate-the-ordinary', title: 'Appreciate the ordinary', prompt: 'Choose one practical, everyday thing that helps your day go more smoothly. Notice it without needing to make a big deal of it.', reflection: 'What ordinary thing helped today?' },
      { activityId: 'everyday-appreciation-kind-words-to-yourself', title: 'Offer kind words to yourself', prompt: 'Speak to yourself as you might speak to a friend who is doing their best. You can keep the words to yourself.', reflection: 'What would feel kind to hear?' },
      { activityId: 'everyday-appreciation-share-thanks-if-welcome', title: 'Share thanks, if welcome', prompt: 'If it feels genuine and welcome, thank someone for one specific thing. A private note to yourself is an equally valid option.', reflection: 'What makes appreciation feel sincere?' },
      { activityId: 'everyday-appreciation-keep-what-feels-meaningful', title: 'Keep what feels meaningful', prompt: 'Choose one form of appreciation you would like to carry forward. It is an invitation, not a daily obligation.', reflection: 'What would you like to remember?' },
    ],
  },
]
