import React, { createContext, useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard, BookOpen, MessageSquare, Languages, HelpCircle, Trophy,
  ChevronLeft, ChevronRight, LogOut, Bell, Sun, Moon, Flame, CheckCircle2,
  Circle, Gift, Gamepad2, TrendingUp, Zap, Star, AlertTriangle, Clock,
  BarChart3, PlayCircle, Users, Bot, Mic, MicOff, Volume2, Globe, Crown,
  Medal, Target, Brain, GitBranch, Sparkles, Calculator, FlaskRound, BookText,
  History, School, Trophy as TrophyIcon, Star as StarIcon, User, Settings
} from 'lucide-react';

// ==================== UTILS ====================
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ==================== THEME CONTEXT ====================
type Theme = 'dark' | 'light';

const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({
  theme: 'dark',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

// ==================== I18N CONTEXT ====================
export type Language = 'en' | 'hi' | 'ta' | 'te';

export const languageNames = {
  en: 'English',
  hi: 'हिन्दी',
  ta: 'தமிழ்',
  te: 'తెలుగు',
};

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.dashboard': 'Dashboard',
    'nav.learning': 'Learning',
    'nav.feedback': 'Feedback',
    'nav.language': 'Language',
    'nav.help': 'Help',
    'nav.leaderboard': 'Leaderboard',
    'nav.rewards': 'My Rewards',
    'dash.totalXp': 'Total XP',
    'dash.xpProgress': 'XP Progress',
    'dash.dailyMissions': 'Daily Missions',
    'dash.mission1': 'Complete Math Quiz',
    'dash.mission2': 'Watch Science Video',
    'dash.mission3': 'Submit English Essay',
    'dash.mission4': 'Join Study Group',
    'dash.streak': 'Day Streak',
    'dash.math': 'Mathematics',
    'dash.science': 'Science',
    'dash.english': 'English',
    'dash.history': 'History',
    'dash.progressStats': 'Progress by Subject',
    'dash.miniGames': 'Mini Games',
    'dash.leaderboard': 'Leaderboard',
    'dash.rewards': 'Rewards Store',
    'dash.notifications': 'Notifications',
    'feedback.title': 'Feedback & Support',
    'feedback.total': 'Total Feedback',
    'feedback.pending': 'Pending',
    'feedback.resolved': 'Resolved',
    'feedback.recent': 'Recent Feedback',
    'help.title': 'Help Center',
    'help.faq': 'FAQs',
    'help.faq1': 'How to reset password?',
    'help.faq2': 'How to join study groups?',
    'help.faq3': 'How to earn XP?',
    'help.faq4': 'How to contact support?',
    'help.microLearning': 'Micro-Learning',
    'help.peerTutors': 'Peer Tutors',
    'help.connect': 'Connect',
    'learn.title': 'Learning Path',
    'learn.continue': 'Continue Learning',
    'learn.new': 'New Module',
    'learn.review': 'Review',
    'learn.complete': 'Complete',
    'learn.skillTree': 'Skill Tree',
    'learn.gameModules': 'Game Modules',
    'learn.studyTeams': 'Study Teams',
    'learn.members': 'members',
    'learn.play': 'Play',
    'lang.title': 'Language & AI Tutor',
    'lang.interface': 'Interface Language',
    'lang.aiTutor': 'AI Tutor',
    'lang.aiGreeting': 'Hi! How can I help you learn today?',
    'lang.userQ': 'Can you explain algebra?',
    'lang.aiAnswer': 'Algebra is the study of mathematical symbols and rules for manipulating them.',
    'lang.askTutor': 'Ask your AI tutor...',
    'lang.stt': 'Speech to Text',
    'lang.tts': 'Text to Speech',
    'lb.title': 'Leaderboard',
    'lb.fullRankings': 'Full Rankings',
    'rewards.title': 'My Rewards',
    'rewards.subtitle': 'Unlock classroom perks with your stars',
    'topbar.notifications': 'New Notifications',
    'topbar.logout': 'Logout',
    'theme.light': 'Light mode',
    'theme.dark': 'Dark mode',
  },
  hi: {
    'Name': 'नाम',
    'Roll Number': 'रोल नंबर',
    'School': 'स्कूल',
    'Mobile': 'मोबाइल',
    'Email': 'ईमेल',
    'Parent Name': 'अभिभावक का नाम',
    'Parent Mobile': 'अभिभावक मोबाइल',
    'Stars': 'स्टार्स',
    'Want to practice?': 'क्या अभ्यास करना चाहेंगे?',
    "That's a great question! Let me help you with that.": 'यह बहुत अच्छा सवाल है! मैं इसमें आपकी मदद करता हूँ।',
    'Can you help me with geometry?': 'क्या आप ज्यामिति में मेरी मदद कर सकते हैं?',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.learning': 'सीखना',
    'nav.feedback': 'प्रतिक्रिया',
    'nav.language': 'भाषा',
    'nav.help': 'सहायता',
    'nav.leaderboard': 'लीडरबोर्ड',
    'nav.rewards': 'मेरे रिवॉर्ड्स',
    'dash.totalXp': 'कुल XP',
    'dash.math': 'गणित',
    'dash.science': 'विज्ञान',
    'dash.english': 'अंग्रेजी',
    'dash.history': 'इतिहास',
    'feedback.title': 'प्रतिक्रिया और सहायता',
    'help.title': 'सहायता केंद्र',
    'learn.title': 'सीखने का पथ',
    'lang.title': 'भाषा और AI ट्यूटर',
    'lb.title': 'लीडरबोर्ड',
    'rewards.title': 'मेरे रिवॉर्ड्स',
    'rewards.subtitle': 'अपने स्टार्स से क्लासरूम रिवॉर्ड्स अनलॉक करें',
    'topbar.logout': 'लॉग आउट',
  },
  ta: {
    'Name': 'பெயர்',
    'Roll Number': 'ரோல் எண்',
    'School': 'பள்ளி',
    'Mobile': 'மொபைல்',
    'Email': 'மின்னஞ்சல்',
    'Parent Name': 'பெற்றோர் பெயர்',
    'Parent Mobile': 'பெற்றோர் மொபைல்',
    'Stars': 'நட்சத்திரங்கள்',
    'Want to practice?': 'பயிற்சி செய்ய விரும்புகிறீர்களா?',
    "That's a great question! Let me help you with that.": 'அது ஒரு சிறந்த கேள்வி! அதில் நான் உதவுகிறேன்.',
    'Can you help me with geometry?': 'ஜியாமெட்ரியில் உதவ முடியுமா?',
    'nav.dashboard': 'டாஷ்போர்டு',
    'nav.learning': 'கற்றல்',
    'nav.feedback': 'கருத்து',
    'nav.language': 'மொழி',
    'nav.help': 'உதவி',
    'nav.leaderboard': 'முன்னணி',
    'nav.rewards': 'என் பரிசுகள்',
    'dash.totalXp': 'மொத்த XP',
    'dash.math': 'கணிதம்',
    'dash.science': 'அறிவியல்',
    'dash.english': 'ஆங்கிலம்',
    'dash.history': 'வரலாறு',
    'feedback.title': 'கருத்து மற்றும் உதவி',
    'help.title': 'உதவி மையம்',
    'learn.title': 'கற்றல் பாதை',
    'lang.title': 'மொழி மற்றும் AI ஆசிரியர்',
    'lb.title': 'முன்னணி பட்டியல்',
    'rewards.title': 'என் பரிசுகள்',
    'rewards.subtitle': 'உங்கள் நட்சத்திரங்களால் வகுப்பு பரிசுகளை திறக்கவும்',
    'topbar.logout': 'வெளியேறு',
  },
  te: {
    'Name': 'పేరు',
    'Roll Number': 'రోల్ నంబర్',
    'School': 'పాఠశాల',
    'Mobile': 'మొబైల్',
    'Email': 'ఈమెయిల్',
    'Parent Name': 'తల్లిదండ్రుల పేరు',
    'Parent Mobile': 'తల్లిదండ్రుల మొబైల్',
    'Stars': 'స్టార్స్',
    'Want to practice?': 'ప్రాక్టీస్ చేయాలనుకుంటున్నారా?',
    "That's a great question! Let me help you with that.": 'అది చాలా మంచి ప్రశ్న! దాంట్లో నేను సహాయం చేస్తాను.',
    'Can you help me with geometry?': 'జ్యామితిలో నన్ను సహాయం చేయగలరా?',
    'nav.dashboard': 'డాష్‌బోర్డ్',
    'nav.learning': 'నేర్చుకోవడం',
    'nav.feedback': 'ఫీడ్‌బ్యాక్',
    'nav.language': 'భాష',
    'nav.help': 'సహాయం',
    'nav.leaderboard': 'ప్రముఖులు',
    'nav.rewards': 'నా రివార్డ్స్',
    'dash.totalXp': 'మొత్తం XP',
    'dash.math': 'గణితం',
    'dash.science': 'సైన్స్',
    'dash.english': 'ఇంగ్లీష్',
    'dash.history': 'చరిత్ర',
    'feedback.title': 'ఫీడ్‌బ్యాక్ మరియు సహాయం',
    'help.title': 'సహాయ కేంద్రం',
    'learn.title': 'నేర్చుకునే మార్గం',
    'lang.title': 'భాష మరియు AI ట్యూటర్',
    'lb.title': 'ప్రముఖుల బోర్డు',
    'rewards.title': 'నా రివార్డ్స్',
    'rewards.subtitle': 'మీ స్టార్స్‌తో తరగతి రివార్డ్స్ అన్‌లాక్ చేయండి',
    'topbar.logout': 'లాగౌట్',
  },
};

const literalTranslations: Record<Language, Record<string, string>> = {
  en: {
    'dash.dayLetters.mon': 'M',
    'dash.dayLetters.tue': 'T',
    'dash.dayLetters.wed': 'W',
    'dash.dayLetters.thu': 'T',
    'dash.dayLetters.fri': 'F',
    'dash.dayLetters.sat': 'S',
    'dash.dayLetters.sun': 'S',
    'dash.game.mathBlitz': 'Math Blitz',
    'dash.game.wordRush': 'Word Rush',
    'dash.game.sciQuiz': 'Sci Quiz',
    'dash.game.memory': 'Memory',
    'learn.module.algebraFundamentals': 'Algebra Fundamentals',
    'learn.module.cellBiology': 'Cell Biology',
    'learn.module.grammarMastery': 'Grammar Mastery',
    'learn.module.worldWars': 'World Wars',
    'learn.game.equationRacer': 'Equation Racer',
    'learn.game.periodicTableMatch': 'Periodic Table Match',
    'learn.game.grammarGauntlet': 'Grammar Gauntlet',
    'learn.game.historyTimeline': 'History Timeline',
    'learn.team.mathWizards': 'Math Wizards',
    'learn.team.sciSquad': 'Sci Squad',
    'learn.team.literatureClub': 'Literature Club',
    'learn.team.historyBuffs': 'History Buffs',
    'help.video.fractions': 'Intro to Fractions',
    'help.video.periodicTable': 'Periodic Table Basics',
    'help.video.essayTips': 'Essay Writing Tips',
    'help.video.historyTimeline': 'World History Timeline',
  },
  hi: {
    'Student': 'छात्र',
    'Class': 'कक्षा',
    'Section': 'अनुभाग',
    'Student Profile': 'छात्र प्रोफाइल',
    'No student information available.': 'कोई छात्र जानकारी उपलब्ध नहीं है।',
    'Logged out successfully!': 'सफलतापूर्वक लॉग आउट हो गया!',
    'Continue your learning journey': 'अपनी सीखने की यात्रा जारी रखें',
    'Complete': 'पूर्ण',
    'Level': 'स्तर',
    'XP earned': 'XP अर्जित',
    'players': 'खिलाड़ी',
    'Join': 'जुड़ें',
    'Share your thoughts and help us improve': 'अपने विचार साझा करें और हमें बेहतर बनाने में मदद करें',
    'Avg Rating': 'औसत रेटिंग',
    'from last week': 'पिछले सप्ताह से',
    'Submit Your Feedback': 'अपनी प्रतिक्रिया जमा करें',
    'Share your thoughts, suggestions, or report an issue...': 'अपने विचार, सुझाव साझा करें या समस्या रिपोर्ट करें...',
    'Feedback submitted! Thanks for your input.': 'प्रतिक्रिया जमा हुई! आपके सुझाव के लिए धन्यवाद।',
    'Learn with AI tutor in your preferred language': 'अपनी पसंदीदा भाषा में AI ट्यूटर के साथ सीखें',
    'Tip: Switch language to practice translation and learn new vocabulary!': 'सुझाव: अनुवाद का अभ्यास करने और नया शब्दकोश सीखने के लिए भाषा बदलें!',
    'Voice input received!': 'वॉइस इनपुट प्राप्त हुआ!',
    'Text to speech activated! 🔊': 'टेक्स्ट टू स्पीच सक्रिय हुआ! 🔊',
    'Send': 'भेजें',
    'views': 'दृश्य',
    'min': 'मिन',
    'Beginner': 'शुरुआती',
    'Intermediate': 'मध्यम',
    'Advanced': 'उन्नत',
    'Easy': 'आसान',
    'Medium': 'मध्यम',
    'Hard': 'कठिन',
    'dash.dayLetters.mon': 'सो',
    'dash.dayLetters.tue': 'मं',
    'dash.dayLetters.wed': 'बु',
    'dash.dayLetters.thu': 'गु',
    'dash.dayLetters.fri': 'शु',
    'dash.dayLetters.sat': 'श',
    'dash.dayLetters.sun': 'र',
    'dash.game.mathBlitz': 'गणित दौड़',
    'dash.game.wordRush': 'शब्द दौड़',
    'dash.game.sciQuiz': 'विज्ञान प्रश्नोत्तरी',
    'dash.game.memory': 'स्मृति',
    'learn.module.algebraFundamentals': 'बीजगणित की बुनियादें',
    'learn.module.cellBiology': 'कोशिका जीवविज्ञान',
    'learn.module.grammarMastery': 'व्याकरण दक्षता',
    'learn.module.worldWars': 'विश्व युद्ध',
    'learn.game.equationRacer': 'समीकरण रेसर',
    'learn.game.periodicTableMatch': 'आवर्त सारणी मिलान',
    'learn.game.grammarGauntlet': 'व्याकरण चुनौती',
    'learn.game.historyTimeline': 'इतिहास समयरेखा',
    'learn.team.mathWizards': 'गणित जादूगर',
    'learn.team.sciSquad': 'विज्ञान दल',
    'learn.team.literatureClub': 'साहित्य क्लब',
    'learn.team.historyBuffs': 'इतिहास प्रेमी',
    'help.answer1': 'सेटिंग्स > खाता > पासवर्ड रीसेट करें। आपको निर्देशों के साथ एक ईमेल मिलेगा।',
    'help.answer2': 'लर्निंग > स्टडी टीम्स में जाएं और उपलब्ध किसी भी टीम पर जुड़ें पर क्लिक करें।',
    'help.answer3': 'दैनिक मिशन पूरे करें, मिनी-गेम खेलें, और XP कमाने के लिए सीखने वाले मॉड्यूल पूरे करें।',
    'help.answer4': 'सहायता के लिए प्रतिक्रिया फ़ॉर्म का उपयोग करें या support@edusync.com पर ईमेल करें।',
    'help.video.fractions': 'भिन्नों का परिचय',
    'help.video.periodicTable': 'आवर्त सारणी की मूल बातें',
    'help.video.essayTips': 'निबंध लेखन सुझाव',
    'help.video.historyTimeline': 'विश्व इतिहास समयरेखा',
    'feedback.sample1': 'गणित का होमवर्क बहुत लंबा था',
    'feedback.sample2': 'नए विज्ञान लैब से प्यार है!',
    'feedback.sample3': 'निबंध लिखने के लिए और समय चाहिए',
    'feedback.sample4': 'कैंटीन के खाने की गुणवत्ता गिर गई',
    'feedback.sample5': 'सीखने के लिए शानदार प्लेटफ़ॉर्म!',
    'common.time.2h': '2 घंटे पहले',
    'common.time.5h': '5 घंटे पहले',
    'common.time.1d': '1 दिन पहले',
    'common.time.2d': '2 दिन पहले',
    'common.time.3d': '3 दिन पहले',
    'Get help and learn new skills': 'मदद लें और नए कौशल सीखें',
    'Connect': 'कनेक्ट करें',
    'Compete and climb the ranks': 'प्रतिस्पर्धा करें और रैंक बढ़ाएं',
    'Redeemed from My Rewards': 'मेरे रिवॉर्ड्स से रिडीम किया गया',
    'Redeemed': 'रिडीम किया गया',
    'No rewards redeemed yet. Visit My Rewards to redeem items.': 'अभी तक कोई रिवॉर्ड रिडीम नहीं हुआ। रिडीम करने के लिए मेरे रिवॉर्ड्स पर जाएं।',
    'Reward redeemed!': 'रिवॉर्ड रिडीम हो गया!',
    'has been added to your dashboard.': 'आपके डैशबोर्ड में जोड़ दिया गया है।',
    'Redeemed successfully': 'सफलतापूर्वक रिडीम किया गया',
    'Locked': 'लॉक्ड',
    'Redeem': 'रिडीम करें',
    '3 new notifications': '3 नई सूचनाएं',
    'Ready to Claim!': 'क्लेम के लिए तैयार!',
    'Almost there, keep going!': 'लगभग पहुंच गए, जारी रखें!',
    'Goal reached!': 'लक्ष्य पूरा!',
    'Progress': 'प्रगति',
    'Extra Library Time': 'अतिरिक्त पुस्तकालय समय',
    'Canteen Coupon': 'कैंटीन कूपन',
    'Morning Song Choice': 'सुबह का गीत चयन',
  },
  ta: {
    'Student': 'மாணவர்',
    'Class': 'வகுப்பு',
    'Section': 'பிரிவு',
    'Student Profile': 'மாணவர் சுயவிவரம்',
    'No student information available.': 'மாணவர் தகவல் இல்லை.',
    'Logged out successfully!': 'வெற்றிகரமாக வெளியேறிவிட்டீர்கள்!',
    'Continue your learning journey': 'உங்கள் கற்றல் பயணத்தை தொடருங்கள்',
    'Complete': 'முடிந்தது',
    'Level': 'நிலை',
    'XP earned': 'XP பெற்றது',
    'players': 'விளையாடுபவர்கள்',
    'Join': 'சேரவும்',
    'Share your thoughts and help us improve': 'உங்கள் கருத்துகளை பகிர்ந்து எங்களை மேம்படுத்த உதவுங்கள்',
    'Avg Rating': 'சராசரி மதிப்பீடு',
    'from last week': 'கடந்த வாரத்துடன் ஒப்பிடுகையில்',
    'Submit Your Feedback': 'உங்கள் கருத்தை சமர்ப்பிக்கவும்',
    'Share your thoughts, suggestions, or report an issue...': 'உங்கள் கருத்துகள், பரிந்துரைகள் அல்லது பிரச்சினையை பகிரவும்...',
    'Feedback submitted! Thanks for your input.': 'கருத்து சமர்ப்பிக்கப்பட்டது! நன்றி.',
    'Learn with AI tutor in your preferred language': 'உங்கள் விருப்ப மொழியில் AI ஆசிரியருடன் கற்பீர்',
    'Tip: Switch language to practice translation and learn new vocabulary!': 'குறிப்பு: மொழியை மாற்றி மொழிபெயர்ப்பு பயிற்சி செய்து புதிய சொற்களை கற்றுக்கொள்ளுங்கள்!',
    'Voice input received!': 'குரல் உள்ளீடு பெறப்பட்டது!',
    'Text to speech activated! 🔊': 'உரை-குரல் செயல்படுத்தப்பட்டது! 🔊',
    'Send': 'அனுப்பு',
    'views': 'பார்வைகள்',
    'min': 'நிமி',
    'Beginner': 'ஆரம்பம்',
    'Intermediate': 'நடுத்தர',
    'Advanced': 'மேம்பட்ட',
    'Easy': 'எளிது',
    'Medium': 'நடுத்தர',
    'Hard': 'கடினம்',
    'dash.dayLetters.mon': 'த',
    'dash.dayLetters.tue': 'செ',
    'dash.dayLetters.wed': 'பு',
    'dash.dayLetters.thu': 'வி',
    'dash.dayLetters.fri': 'வெ',
    'dash.dayLetters.sat': 'ச',
    'dash.dayLetters.sun': 'ஞ',
    'dash.game.mathBlitz': 'கணிதப் பாய்ச்சி',
    'dash.game.wordRush': 'சொல் பாய்ச்சி',
    'dash.game.sciQuiz': 'அறிவியல் வினாடி வினா',
    'dash.game.memory': 'நினைவாற்றல்',
    'learn.module.algebraFundamentals': 'அல்ஜீப்ரா அடிப்படைகள்',
    'learn.module.cellBiology': 'செல் உயிரியல்',
    'learn.module.grammarMastery': 'இலக்கண நிபுணத்துவம்',
    'learn.module.worldWars': 'உலகப் போர்கள்',
    'learn.game.equationRacer': 'சமன்பாடு ரேசர்',
    'learn.game.periodicTableMatch': 'அட்டவணை பொருத்தம்',
    'learn.game.grammarGauntlet': 'இலக்கண சவால்',
    'learn.game.historyTimeline': 'வரலாறு காலவரிசை',
    'learn.team.mathWizards': 'கணித மந்திரவாதிகள்',
    'learn.team.sciSquad': 'அறிவியல் குழு',
    'learn.team.literatureClub': 'இலக்கியக் கழகம்',
    'learn.team.historyBuffs': 'வரலாறு ஆர்வலர்கள்',
    'help.answer1': 'அமைப்புகள் > கணக்கு > கடவுச்சொல்லை மீட்டமை. வழிமுறைகளுடன் ஒரு மின்னஞ்சல் வரும்.',
    'help.answer2': 'கற்றல் > படிப்பு குழுக்கள் சென்று கிடைக்கும் எந்த குழுவிலும் Join ஐ கிளிக் செய்யுங்கள்.',
    'help.answer3': 'தினசரி பணிகளை முடிக்கவும், மினி-கேம்கள் விளையாடவும், கற்றல் தொகுதிகளை முடிக்கவும்.',
    'help.answer4': 'உதவிக்கு கருத்து படிவத்தைப் பயன்படுத்தவும் அல்லது support@edusync.com க்கு மின்னஞ்சல் செய்யவும்.',
    'help.video.fractions': 'பகுத்துகளின் அறிமுகம்',
    'help.video.periodicTable': 'அட்டவணை அடிப்படைகள்',
    'help.video.essayTips': 'கட்டுரை எழுதும் குறிப்புகள்',
    'help.video.historyTimeline': 'உலக வரலாறு காலவரிசை',
    'feedback.sample1': 'கணித வீட்டுப்பாடம் மிகவும் நீளமானது',
    'feedback.sample2': 'புதிய அறிவியல் ஆய்வகம் அருமை!',
    'feedback.sample3': 'கட்டுரை எழுத அதிக நேரம் வேண்டும்',
    'feedback.sample4': 'கேன்டீன் உணவின் தரம் குறைந்தது',
    'feedback.sample5': 'கற்றலுக்கான சிறந்த தளம்!',
    'common.time.2h': '2 மணி முன்பு',
    'common.time.5h': '5 மணி முன்பு',
    'common.time.1d': '1 நாள் முன்பு',
    'common.time.2d': '2 நாட்கள் முன்பு',
    'common.time.3d': '3 நாட்கள் முன்பு',
    'Get help and learn new skills': 'உதவி பெற்று புதிய திறன்களை கற்றுக்கொள்ளுங்கள்',
    'Connect': 'இணைக',
    'Compete and climb the ranks': 'போட்டியிட்டு தரவரிசையில் உயருங்கள்',
    'Redeemed from My Rewards': 'என் பரிசுகளிலிருந்து பெற்றது',
    'Redeemed': 'பெற்றது',
    'No rewards redeemed yet. Visit My Rewards to redeem items.': 'இன்னும் பரிசுகள் பெறப்படவில்லை. பெற My Rewards-ஐ பாருங்கள்.',
    'Reward redeemed!': 'பரிசு பெறப்பட்டது!',
    'has been added to your dashboard.': 'உங்கள் டாஷ்போர்டில் சேர்க்கப்பட்டது.',
    'Redeemed successfully': 'வெற்றிகரமாக பெறப்பட்டது',
    'Locked': 'பூட்டப்பட்டது',
    'Redeem': 'பெறு',
    '3 new notifications': '3 புதிய அறிவிப்புகள்',
    'Ready to Claim!': 'பெற தயாராக உள்ளது!',
    'Almost there, keep going!': 'கிட்டத்தட்ட வந்துவிட்டீர்கள், தொடருங்கள்!',
    'Goal reached!': 'இலக்கு நிறைவேறியது!',
    'Progress': 'முன்னேற்றம்',
    'Extra Library Time': 'கூடுதல் நூலக நேரம்',
    'Canteen Coupon': 'கேன்டீன் கூப்பன்',
    'Morning Song Choice': 'காலை பாடல் தேர்வு',
  },
  te: {
    'Student': 'విద్యార్థి',
    'Class': 'తరగతి',
    'Section': 'విభాగం',
    'Student Profile': 'విద్యార్థి ప్రొఫైల్',
    'No student information available.': 'విద్యార్థి సమాచారం అందుబాటులో లేదు.',
    'Logged out successfully!': 'విజయవంతంగా లాగౌట్ అయ్యారు!',
    'Continue your learning journey': 'మీ అభ్యాస ప్రయాణాన్ని కొనసాగించండి',
    'Complete': 'పూర్తి',
    'Level': 'స్థాయి',
    'XP earned': 'XP సంపాదించారు',
    'players': 'ఆటగాళ్లు',
    'Join': 'చేరండి',
    'Share your thoughts and help us improve': 'మీ అభిప్రాయాన్ని పంచి మమ్మల్ని మెరుగుపరచడంలో సహకరించండి',
    'Avg Rating': 'సగటు రేటింగ్',
    'from last week': 'గత వారం నుండి',
    'Submit Your Feedback': 'మీ ఫీడ్‌బ్యాక్ పంపండి',
    'Share your thoughts, suggestions, or report an issue...': 'మీ ఆలోచనలు, సూచనలు పంచండి లేదా సమస్య నివేదించండి...',
    'Feedback submitted! Thanks for your input.': 'ఫీడ్‌బ్యాక్ పంపబడింది! ధన్యవాదాలు.',
    'Learn with AI tutor in your preferred language': 'మీ ఇష్టమైన భాషలో AI ట్యూటర్‌తో నేర్చుకోండి',
    'Tip: Switch language to practice translation and learn new vocabulary!': 'సూచన: అనువాదం సాధన కోసం మరియు కొత్త పదాలు నేర్చుకోవడానికి భాష మార్చండి!',
    'Voice input received!': 'వాయిస్ ఇన్‌పుట్ అందింది!',
    'Text to speech activated! 🔊': 'టెక్స్ట్ టు స్పీచ్ యాక్టివేట్ అయింది! 🔊',
    'Send': 'పంపు',
    'views': 'వీక్షణలు',
    'min': 'ని',
    'Beginner': 'ప్రారంభ స్థాయి',
    'Intermediate': 'మధ్యస్థ',
    'Advanced': 'ఉన్నత',
    'Easy': 'సులువు',
    'Medium': 'మధ్యస్థ',
    'Hard': 'కష్టం',
    'dash.dayLetters.mon': 'సో',
    'dash.dayLetters.tue': 'మ',
    'dash.dayLetters.wed': 'బు',
    'dash.dayLetters.thu': 'గు',
    'dash.dayLetters.fri': 'శు',
    'dash.dayLetters.sat': 'శ',
    'dash.dayLetters.sun': 'ఆ',
    'dash.game.mathBlitz': 'గణిత బ్లిట్జ్',
    'dash.game.wordRush': 'పదాల రష్',
    'dash.game.sciQuiz': 'సైన్స్ క్విజ్',
    'dash.game.memory': 'జ్ఞాపకం',
    'learn.module.algebraFundamentals': 'బీజగణితపు మౌలికాలు',
    'learn.module.cellBiology': 'కణ జీవశాస్త్రం',
    'learn.module.grammarMastery': 'వ్యాకరణ నైపుణ్యం',
    'learn.module.worldWars': 'ప్రపంచ యుద్ధాలు',
    'learn.game.equationRacer': 'సమీకరణ రేసర్',
    'learn.game.periodicTableMatch': 'పీరియాడిక్ టేబుల్ మ్యాచ్',
    'learn.game.grammarGauntlet': 'వ్యాకరణ గాంట్లెట్',
    'learn.game.historyTimeline': 'చరిత్ర టైమ్‌లైన్',
    'learn.team.mathWizards': 'మ్యాథ్ విజార్డ్స్',
    'learn.team.sciSquad': 'సై సక్వాడ్',
    'learn.team.literatureClub': 'లిటరేచర్ క్లబ్',
    'learn.team.historyBuffs': 'హిస్టరీ బఫ్స్',
    'help.answer1': 'సెట్టింగ్స్ > అకౌంట్ > రీసెట్ పాస్‌వర్డ్‌కు వెళ్లండి. సూచనలతో ఇమెయిల్ వస్తుంది.',
    'help.answer2': 'లెర్నింగ్ > స్టడీ టీమ్స్‌లోకి వెళ్లి అందుబాటులో ఉన్న టీమ్‌పై చేరండి క్లిక్ చేయండి.',
    'help.answer3': 'రోజువారీ మిషన్లు పూర్తి చేయండి, మినీ-గేమ్స్ ఆడండి, మరియు లెర్నింగ్ మాడ్యూళ్లు పూర్తి చేయండి.',
    'help.answer4': 'సహాయం కోసం ఫీడ్‌బ్యాక్ ఫారమ్‌ను ఉపయోగించండి లేదా support@edusync.com కి ఇమెయిల్ చేయండి.',
    'help.video.fractions': 'భాగాల పరిచయం',
    'help.video.periodicTable': 'పీరియాడిక్ టేబుల్ బేసిక్స్',
    'help.video.essayTips': 'వ్యాస రచన సూచనలు',
    'help.video.historyTimeline': 'ప్రపంచ చరిత్ర టైమ్‌లైన్',
    'feedback.sample1': 'గణిత హోంవర్క్ చాలా పొడవుగా ఉంది',
    'feedback.sample2': 'కొత్త సైన్స్ ల్యాబ్ చాలా నచ్చింది!',
    'feedback.sample3': 'వ్యాస రచనకు ఇంకా సమయం కావాలి',
    'feedback.sample4': 'క్యాంటీన్ ఆహార నాణ్యత తగ్గింది',
    'feedback.sample5': 'నేర్చుకోవడానికి గొప్ప ప్లాట్‌ఫారమ్!',
    'common.time.2h': '2గం క్రితం',
    'common.time.5h': '5గం క్రితం',
    'common.time.1d': '1 రోజు క్రితం',
    'common.time.2d': '2 రోజులు క్రితం',
    'common.time.3d': '3 రోజులు క్రితం',
    'Get help and learn new skills': 'సహాయం పొందండి మరియు కొత్త నైపుణ్యాలు నేర్చుకోండి',
    'Connect': 'కనెక్ట్ అవ్వండి',
    'Compete and climb the ranks': 'పోటీ చేసి ర్యాంకుల్లో ఎక్కండి',
    'Redeemed from My Rewards': 'నా రివార్డ్స్ నుండి రీడీమ్ చేయబడింది',
    'Redeemed': 'రీడీమ్ చేయబడింది',
    'No rewards redeemed yet. Visit My Rewards to redeem items.': 'ఇంకా రివార్డ్స్ రీడీమ్ కాలేదు. రీడీమ్ చేయడానికి My Rewards చూడండి.',
    'Reward redeemed!': 'రివార్డ్ రీడీమ్ అయింది!',
    'has been added to your dashboard.': 'మీ డ్యాష్‌బోర్డ్‌కు జోడించబడింది.',
    'Redeemed successfully': 'విజయవంతంగా రీడీమ్ అయ్యింది',
    'Locked': 'లాక్ చేయబడింది',
    'Redeem': 'రీడీమ్ చేయండి',
    '3 new notifications': '3 కొత్త నోటిఫికేషన్లు',
    'Ready to Claim!': 'క్లెయిమ్ చేయడానికి సిద్ధం!',
    'Almost there, keep going!': 'దగ్గరలోనే ఉంది, కొనసాగించండి!',
    'Goal reached!': 'లక్ష్యం చేరుకుంది!',
    'Progress': 'ప్రగతి',
    'Extra Library Time': 'అదనపు లైబ్రరీ సమయం',
    'Canteen Coupon': 'క్యాంటీన్ కూపన్',
    'Morning Song Choice': 'ఉదయపు పాట ఎంపిక',
  },
};

const I18nContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}>({
  language: 'en',
  setLanguage: () => {},
  t: (k) => k,
});

export const useI18n = () => useContext(I18nContext);

// ==================== REWARDS CONTEXT ====================
interface RewardCatalogItem {
  id: string;
  title: string;
  icon: string;
  stars: number;
  progress: number;
  status: string;
  caption: string;
  cardTone: string;
  iconTone: string;
  statusTone: string;
  buttonTone: string;
}

interface RewardsContextType {
  redeemedRewardIds: string[];
  redeemReward: (rewardId: string) => void;
}

const rewardsCatalog: RewardCatalogItem[] = [
  {
    id: 'extra-library-time',
    title: 'Extra Library Time',
    icon: '📖',
    stars: 100,
    progress: 100,
    status: 'Ready to Claim!',
    caption: 'Goal reached!',
    cardTone: 'bg-white/10 dark:bg-black/30 border-blue-500/30',
    iconTone: 'from-blue-500 to-purple-500',
    statusTone: 'text-blue-500',
    buttonTone: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white',
  },
  {
    id: 'canteen-coupon',
    title: 'Canteen Coupon',
    icon: '🍴',
    stars: 250,
    progress: 200,
    status: 'Almost there, keep going!',
    caption: 'Progress',
    cardTone: 'bg-white/10 dark:bg-black/30 border-purple-500/30',
    iconTone: 'from-purple-500 to-pink-500',
    statusTone: 'text-gray-500 dark:text-gray-400',
    buttonTone: 'bg-black/10 dark:bg-white/10 text-gray-500 dark:text-gray-400',
  },
  {
    id: 'morning-song-choice',
    title: 'Morning Song Choice',
    icon: '🎵',
    stars: 50,
    progress: 50,
    status: 'Ready to Claim!',
    caption: 'Goal reached!',
    cardTone: 'bg-white/10 dark:bg-black/30 border-blue-500/30',
    iconTone: 'from-blue-500 to-cyan-500',
    statusTone: 'text-blue-500',
    buttonTone: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white',
  },
];

const RewardsContext = createContext<RewardsContextType>({
  redeemedRewardIds: [],
  redeemReward: () => {},
});

const useRewards = () => useContext(RewardsContext);

// ==================== GLASS CARD ====================
interface GlassCardProps {
  glow?: 'blue' | 'purple' | 'coral' | 'none';
  hover?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({ glow = 'none', hover = true, children, className = '', onClick }) => {
  const glowClasses = {
    blue: 'shadow-[0_0_15px_rgba(59,130,246,0.3)]',
    purple: 'shadow-[0_0_15px_rgba(168,85,247,0.3)]',
    coral: 'shadow-[0_0_15px_rgba(255,99,71,0.3)]',
    none: '',
  };

  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`backdrop-blur-xl bg-white/10 dark:bg-black/30 rounded-2xl p-6 border border-white/20 ${glowClasses[glow]} ${className}`}
    >
      {children}
    </motion.div>
  );
};

// ==================== TOPBAR ====================
const TopBar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useI18n();
  const { user } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  const profileDetails = [
    { label: 'Name', value: user?.fullName },
    { label: 'Class', value: user?.classLevel || user?.class },
    { label: 'Section', value: user?.section },
    { label: 'Roll Number', value: user?.rollNumber },
    { label: 'School', value: user?.schoolName },
    { label: 'Mobile', value: user?.mobile },
    { label: 'Email', value: user?.email },
    { label: 'Parent Name', value: user?.parentName },
    { label: 'Parent Mobile', value: user?.parentMobile },
  ].filter((detail) => Boolean(detail.value));

  return (
    <div className="flex items-center justify-end gap-3 mb-5">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        className="p-2.5 rounded-lg backdrop-blur-xl bg-white/10 dark:bg-black/30 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => toast.info(t('topbar.notifications'), { description: t('3 new notifications') })}
        className="p-2.5 rounded-lg backdrop-blur-xl bg-white/10 dark:bg-black/30 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors relative"
      >
        <Bell size={20} />
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-red-500 text-[9px] font-bold flex items-center justify-center text-white">3</span>
      </motion.button>
      <div className="relative">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowProfile((prev) => !prev)}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg backdrop-blur-xl bg-white/10 dark:bg-black/30 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-base"
        >
          <User size={18} />
          <span className="hidden sm:inline">{user?.fullName || t('Student Profile')}</span>
        </motion.button>

        <AnimatePresence>
          {showProfile && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="absolute right-0 top-full mt-2 z-50 w-80 max-w-[85vw] rounded-xl border border-white/20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-xl p-4"
            >
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <User size={14} className="text-blue-500" /> {t('Student Profile')}
              </h3>
              <div className="space-y-2">
                {profileDetails.length > 0 ? (
                  profileDetails.map((detail) => (
                    <div key={detail.label} className="grid grid-cols-[110px_1fr] gap-2 text-sm">
                      <span className="text-gray-500 dark:text-gray-400">{t(detail.label)}</span>
                      <span className="font-medium break-words">{detail.value}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('No student information available.')}</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ==================== SIDEBAR ====================
const menuItems = [
  { id: 'dashboard', labelKey: 'nav.dashboard', icon: LayoutDashboard },
  { id: 'learning', labelKey: 'nav.learning', icon: BookOpen },
  { id: 'feedback', labelKey: 'nav.feedback', icon: MessageSquare },
  { id: 'language', labelKey: 'nav.language', icon: Languages },
  { id: 'help', labelKey: 'nav.help', icon: HelpCircle },
  { id: 'leaderboard', labelKey: 'nav.leaderboard', icon: Trophy },
  { id: 'rewards', labelKey: 'nav.rewards', icon: Gift },
];

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useI18n();
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="h-screen backdrop-blur-xl bg-white/10 dark:bg-black/30 border-r border-white/20 flex flex-col relative shrink-0"
    >
      <div className="p-5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shrink-0">
          <span className="font-bold text-white text-sm">E</span>
        </div>
        {!collapsed && (
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-bold text-lg tracking-wider bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            EDUSYNC
          </motion.h1>
        )}
      </div>
      <nav className="flex-1 px-3 mt-4 space-y-1">
        {menuItems.map((item) => {
          const active = activeView === item.id;
          return (
            <motion.button
              key={item.id}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-lg transition-all duration-200 text-base font-medium ${
                active
                  ? 'bg-blue-500/15 text-blue-500 border border-blue-500/30'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/10'
              }`}
            >
              <item.icon size={22} className="shrink-0" />
              {!collapsed && <span>{t(item.labelKey)}</span>}
            </motion.button>
          );
        })}
      </nav>

      <div className="px-3 pb-2">
        <motion.button
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            logout();
            toast.success(t('topbar.logout'), { description: t('Logged out successfully!') });
            navigate('/student-login');
          }}
          className="w-full flex items-center gap-3 px-3.5 py-3 rounded-lg transition-all duration-200 text-base font-medium text-red-500 hover:bg-red-500/10"
        >
          <LogOut size={22} className="shrink-0" />
          {!collapsed && <span>{t('topbar.logout')}</span>}
        </motion.button>
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="m-3 p-2 rounded-lg backdrop-blur-xl bg-white/10 dark:bg-black/30 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center justify-center"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </motion.aside>
  );
};

// ==================== DASHBOARD PAGE ====================
const DashboardPage = () => {
  const { t } = useI18n();
  const { user } = useAuth();
  const { redeemedRewardIds } = useRewards();
  const studentName = user?.fullName || t('Student');
  const classLevel = user?.classLevel || user?.class || '-';
  const section = user?.section || '-';
  const redeemedRewards = rewardsCatalog.filter((reward) => redeemedRewardIds.includes(reward.id));

  const missions = [
    { task: t('dash.mission1'), xp: 50, done: true },
    { task: t('dash.mission2'), xp: 30, done: true },
    { task: t('dash.mission3'), xp: 80, done: false },
    { task: t('dash.mission4'), xp: 40, done: false },
  ];
  const stats = [
    { subject: t('dash.math'), pct: 85, color: 'bg-blue-500', icon: Calculator },
    { subject: t('dash.science'), pct: 72, color: 'bg-purple-500', icon: FlaskRound },
    { subject: t('dash.english'), pct: 90, color: 'bg-orange-500', icon: BookText },
    { subject: t('dash.history'), pct: 60, color: 'bg-pink-500', icon: History },
  ];

  return (
    <div className="space-y-5">
      {/* Profile Card */}
      <GlassCard glow="blue" className="flex items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-2xl font-bold">
            🧑‍🎓
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-white dark:border-black" />
        </div>
        <div>
          <h2 className="font-bold text-lg">{studentName}</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-500 text-xs font-semibold">{t('Class')} {classLevel}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{t('Section')} {section}</span>
          </div>
        </div>
        <div className="ml-auto text-right">
          <div className="text-2xl font-bold text-blue-500">4,280</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{t('dash.totalXp')}</div>
        </div>
      </GlassCard>

      {/* XP Bar */}
      <GlassCard>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium flex items-center gap-2">
            <Zap size={16} className="text-blue-500" /> {t('dash.xpProgress')}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">3,280 / 5,000 XP</span>
        </div>
        <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '66%' }}
            transition={{ duration: 1.5 }}
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
          <span>Level 24</span>
          <span>66% to Level 25</span>
        </div>
      </GlassCard>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Daily Missions */}
        <GlassCard glow="purple">
          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <Star size={16} className="text-purple-500" /> {t('dash.dailyMissions')}
          </h3>
          <div className="space-y-2">
            {missions.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-center gap-3 p-2.5 rounded-lg ${m.done ? 'bg-blue-500/5' : 'bg-black/5 dark:bg-white/5'}`}
              >
                {m.done ? <CheckCircle2 size={18} className="text-blue-500 shrink-0" /> : <Circle size={18} className="text-gray-400 shrink-0" />}
                <span className={`text-sm flex-1 ${m.done ? 'line-through text-gray-500' : ''}`}>{m.task}</span>
                <span className="text-xs font-semibold text-purple-500">+{m.xp} XP</span>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Streak Tracker */}
        <GlassCard glow="coral">
          <div className="flex items-center gap-2 mb-3">
            <Flame size={20} className="text-orange-500" />
            <span className="font-semibold text-sm">5 {t('dash.streak')}</span>
          </div>
          <div className="flex gap-2">
            {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((day, i) => (
              <div key={i} className="flex-1 text-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-bold ${i < 5 ? 'bg-orange-500/20 text-orange-500' : 'bg-black/5 dark:bg-white/5 text-gray-500'}`}
                >
                  {i < 5 ? '🔥' : t(`dash.dayLetters.${day}`)}
                </motion.div>
                <span className="text-[10px] text-gray-500 mt-1 block">{t(`dash.dayLetters.${day}`)}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Progress Stats */}
        <GlassCard>
          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <TrendingUp size={16} className="text-blue-500" /> {t('dash.progressStats')}
          </h3>
          <div className="space-y-3">
            {stats.map((s, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="flex items-center gap-1"><s.icon size={12} /> {s.subject}</span>
                  <span className="text-gray-500">{s.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.pct}%` }}
                    transition={{ duration: 1, delay: i * 0.15 }}
                    className={`h-full rounded-full ${s.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Mini Games */}
        <GlassCard glow="blue">
          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <Gamepad2 size={16} className="text-blue-500" /> {t('dash.miniGames')}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { nameKey: 'dash.game.mathBlitz', emoji: '🧮', xp: 100, color: 'from-blue-500 to-cyan-500' },
              { nameKey: 'dash.game.wordRush', emoji: '📝', xp: 80, color: 'from-green-500 to-emerald-500' },
              { nameKey: 'dash.game.sciQuiz', emoji: '🔬', xp: 120, color: 'from-purple-500 to-pink-500' },
              { nameKey: 'dash.game.memory', emoji: '🧠', xp: 60, color: 'from-orange-500 to-red-500' },
            ].map((g, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`backdrop-blur-xl bg-gradient-to-br ${g.color}/20 dark:bg-black/40 rounded-lg p-3 text-center border border-transparent transition-all`}
              >
                <div className="text-2xl mb-1">{g.emoji}</div>
                <div className="text-xs font-medium">{t(g.nameKey)}</div>
                <div className="text-[10px] text-purple-500 mt-0.5">+{g.xp} XP</div>
              </motion.button>
            ))}
          </div>
        </GlassCard>

        {/* Leaderboard Preview */}
        <GlassCard>
          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <Trophy size={16} className="text-yellow-400" /> {t('dash.leaderboard')}
          </h3>
          <div className="space-y-2">
            {[
              { name: 'Sarah K.', xp: 5200, avatar: '👩‍🚀', rank: 1, streak: 12 },
              { name: 'Alex N.', xp: 4280, avatar: '🧑‍🎓', rank: 2, streak: 5 },
              { name: 'Mike R.', xp: 3950, avatar: '🧑‍💻', rank: 3, streak: 8 },
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 p-2 rounded-lg bg-black/5 dark:bg-white/5"
              >
                <span className={`text-lg font-bold w-6 ${p.rank === 1 ? 'text-yellow-400' : p.rank === 2 ? 'text-gray-400' : p.rank === 3 ? 'text-amber-600' : 'text-gray-500'}`}>#{p.rank}</span>
                <span className="text-xl">{p.avatar}</span>
                <span className="text-sm font-medium flex-1">{p.name}</span>
                <span className="text-xs text-orange-500">🔥 {p.streak}</span>
                <span className="text-xs font-semibold text-blue-500">{p.xp.toLocaleString()} XP</span>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Rewards & Notifications */}
        <div className="space-y-4">
          <GlassCard glow="purple">
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <Gift size={16} className="text-purple-500" /> {t('dash.rewards')}
            </h3>
            <div className="space-y-2">
              {redeemedRewards.length > 0 ? (
                redeemedRewards.map((reward, i) => (
                  <motion.div
                    key={reward.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20"
                  >
                    <span className="text-xl">{reward.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{t(reward.title)}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{t('Redeemed from My Rewards')}</p>
                    </div>
                    <span className="text-xs font-semibold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">{t('Redeemed')}</span>
                  </motion.div>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 bg-black/5 dark:bg-white/5 p-3 rounded-lg">
                  {t('No rewards redeemed yet. Visit My Rewards to redeem items.')}
                </p>
              )}
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <Bell size={16} className="text-orange-500" /> {t('dash.notifications')}
            </h3>
            <div className="space-y-2">
              {[
                { msg: 'New quiz available in Math!', time: '2m ago', icon: '📢', unread: true },
                { msg: 'Sarah sent you a study invite', time: '15m ago', icon: '💬', unread: true },
                { msg: 'Achievement unlocked: 5-day streak!', time: '1h ago', icon: '🏆', unread: false },
              ].map((n, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-start gap-2 p-2 rounded-lg ${n.unread ? 'bg-blue-500/10' : 'bg-black/5 dark:bg-white/5'} text-xs cursor-pointer hover:bg-blue-500/20 transition-colors`}
                >
                  <span className="text-base">{n.icon}</span>
                  <div className="flex-1">
                    <p className={n.unread ? 'font-semibold' : ''}>{n.msg}</p>
                    <p className="text-gray-500 mt-0.5">{n.time}</p>
                  </div>
                  {n.unread && <span className="w-2 h-2 rounded-full bg-blue-500" />}
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

// ==================== LEARNING PAGE ====================
const LearningPage = () => {
  const { t } = useI18n();

  const skillTree = [
    { name: 'Algebra', level: 5, maxLevel: 8, unlocked: true, icon: Calculator, xp: 450 },
    { name: 'Geometry', level: 3, maxLevel: 6, unlocked: true, icon: Target, xp: 280 },
    { name: 'Calculus', level: 1, maxLevel: 10, unlocked: true, icon: Brain, xp: 120 },
    { name: 'Statistics', level: 0, maxLevel: 5, unlocked: false, icon: BarChart3, xp: 0 },
  ];

  const modules = [
    { titleKey: 'learn.module.algebraFundamentals', progress: 72, emoji: '📐', subject: 'Mathematics', xp: 150, colorClass: 'bg-blue-500' },
    { titleKey: 'learn.module.cellBiology', progress: 45, emoji: '🔬', subject: 'Science', xp: 120, colorClass: 'bg-green-500' },
    { titleKey: 'learn.module.grammarMastery', progress: 90, emoji: '📖', subject: 'English', xp: 100, colorClass: 'bg-orange-500' },
    { titleKey: 'learn.module.worldWars', progress: 30, emoji: '🏛️', subject: 'History', xp: 80, colorClass: 'bg-red-500' },
  ];

  return (
    <div className="space-y-7">
      <div className="sticky top-0 z-10 pb-2 mb-1 backdrop-blur-sm bg-gradient-to-b from-gray-100/95 to-gray-100/70 dark:from-gray-900/95 dark:to-gray-900/70">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">{t('learn.title')}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{t('Continue your learning journey')}</p>
      </div>

      {/* Continue Learning Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {modules.map((mod, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard hover className="cursor-pointer group">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{mod.emoji}</span>
                <div>
                  <p className="text-xs text-gray-500">{mod.subject}</p>
                  <p className="text-sm font-semibold group-hover:text-blue-500 transition-colors">{t(mod.titleKey)}</p>
                </div>
              </div>
              <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${mod.progress}%` }}
                  transition={{ duration: 1, delay: i * 0.2 }}
                  className={cn('h-full rounded-full', mod.colorClass)}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs">
                <span className="text-gray-500">{mod.progress}% {t('Complete')}</span>
                <span className="text-purple-500 font-semibold">+{mod.xp} XP</span>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Skill Tree */}
      <GlassCard glow="purple">
        <h2 className="font-semibold text-sm mb-4 flex items-center gap-2">
          <GitBranch size={16} className="text-purple-500" /> {t('learn.skillTree')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {skillTree.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`p-4 rounded-xl text-center ${s.unlocked ? 'backdrop-blur-xl bg-white/10 dark:bg-black/30 border border-blue-500/30' : 'opacity-50 backdrop-blur-xl bg-white/10 dark:bg-black/30'}`}
            >
              <s.icon size={28} className={`mx-auto mb-2 ${s.unlocked ? 'text-blue-500' : 'text-gray-500'}`} />
              <p className="text-sm font-semibold">{s.name}</p>
              <p className="text-xs text-gray-500 mt-1">{t('Level')} {s.level}/{s.maxLevel}</p>
              <div className="h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 mt-2 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: `${(s.level / s.maxLevel) * 100}%` }} />
              </div>
              {s.xp > 0 && <p className="text-[10px] text-purple-500 mt-1">+{s.xp} {t('XP earned')}</p>}
            </motion.div>
          ))}
        </div>
      </GlassCard>

      {/* Game Modules & Study Teams */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GlassCard>
          <h2 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <Gamepad2 size={16} className="text-orange-500" /> {t('learn.gameModules')}
          </h2>
          <div className="space-y-2">
            {[
              { nameKey: 'learn.game.equationRacer', emoji: '🏎️', xp: 100, players: 234, difficultyKey: 'Easy' },
              { nameKey: 'learn.game.periodicTableMatch', emoji: '🧪', xp: 120, players: 156, difficultyKey: 'Medium' },
              { nameKey: 'learn.game.grammarGauntlet', emoji: '⚔️', xp: 80, players: 189, difficultyKey: 'Hard' },
              { nameKey: 'learn.game.historyTimeline', emoji: '📅', xp: 90, players: 98, difficultyKey: 'Medium' },
            ].map((g, i) => (
              <motion.button
                key={i}
                whileHover={{ x: 4 }}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{g.emoji}</span>
                  <div className="text-left">
                    <p className="text-sm font-medium">{t(g.nameKey)}</p>
                    <p className="text-[10px] text-gray-500">{g.players} {t('players')} • {t(g.difficultyKey)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-purple-500 font-semibold">+{g.xp} XP</span>
                  <PlayCircle size={16} className="text-blue-500" />
                </div>
              </motion.button>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <Users size={16} className="text-blue-500" /> {t('learn.studyTeams')}
          </h2>
          <div className="space-y-2">
            {[
              { teamKey: 'learn.team.mathWizards', members: 4, active: true, subject: 'Mathematics', levelKey: 'Advanced' },
              { teamKey: 'learn.team.sciSquad', members: 3, active: false, subject: 'Science', levelKey: 'Intermediate' },
              { teamKey: 'learn.team.literatureClub', members: 5, active: true, subject: 'English', levelKey: 'Beginner' },
              { teamKey: 'learn.team.historyBuffs', members: 2, active: true, subject: 'History', levelKey: 'Advanced' },
            ].map((tm, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between p-3 rounded-lg bg-black/5 dark:bg-white/5"
              >
                <div>
                  <p className="text-sm font-medium">{t(tm.teamKey)}</p>
                  <p className="text-[10px] text-gray-500">{tm.subject} • {t(tm.levelKey)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Users size={12} className="text-gray-500" />
                    <span className="text-xs text-gray-500">{tm.members}</span>
                  </div>
                  {tm.active && <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-500 text-xs font-semibold"
                  >
                    {t('Join')}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

// ==================== FEEDBACK PAGE ====================
const FeedbackPage = () => {
  const { t } = useI18n();

  const feedbackItems = [
    { msgKey: 'feedback.sample1', status: 'resolved', sentiment: 'negative', timeKey: 'common.time.2h', rating: 2 },
    { msgKey: 'feedback.sample2', status: 'resolved', sentiment: 'positive', timeKey: 'common.time.5h', rating: 5 },
    { msgKey: 'feedback.sample3', status: 'pending', sentiment: 'neutral', timeKey: 'common.time.1d', rating: 3 },
    { msgKey: 'feedback.sample4', status: 'escalated', sentiment: 'negative', timeKey: 'common.time.2d', rating: 1 },
    { msgKey: 'feedback.sample5', status: 'resolved', sentiment: 'positive', timeKey: 'common.time.3d', rating: 5 },
  ];

  const statusIcon = {
    resolved: <CheckCircle2 size={14} className="text-green-400" />,
    pending: <Clock size={14} className="text-yellow-400" />,
    escalated: <AlertTriangle size={14} className="text-orange-500" />,
  };

  const sentimentColor = {
    positive: 'border-l-green-400',
    negative: 'border-l-red-400',
    neutral: 'border-l-blue-400',
  };

  return (
    <div className="space-y-7">
      <div className="sticky top-0 z-10 pb-2 mb-1 backdrop-blur-sm bg-gradient-to-b from-gray-100/95 to-gray-100/70 dark:from-gray-900/95 dark:to-gray-900/70">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">{t('feedback.title')}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{t('Share your thoughts and help us improve')}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: t('feedback.total'), value: 24, icon: MessageSquare, color: 'text-blue-500', change: '+12%' },
          { label: t('feedback.pending'), value: 8, icon: Clock, color: 'text-yellow-400', change: '-2' },
          { label: t('feedback.resolved'), value: 14, icon: CheckCircle2, color: 'text-green-400', change: '+5' },
          { label: t('Avg Rating'), value: '4.2', icon: Star, color: 'text-yellow-400', change: '+0.3' },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
                <s.icon size={28} className={s.color} />
              </div>
              <p className="text-[10px] text-green-400 mt-2">{s.change} {t('from last week')}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Submit Feedback */}
      <GlassCard glow="blue">
        <h2 className="font-semibold text-sm mb-3 flex items-center gap-2">
          <MessageSquare size={16} className="text-blue-500" /> {t('Submit Your Feedback')}
        </h2>
        <div className="space-y-3">
          <textarea
            placeholder={t('Share your thoughts, suggestions, or report an issue...')}
            className="w-full p-3 rounded-lg bg-black/5 dark:bg-white/5 border border-white/20 focus:border-blue-500 outline-none text-sm resize-none"
            rows={3}
          />
          <div className="flex justify-end">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold"
              onClick={() => toast.success(t('Feedback submitted! Thanks for your input.'))}
            >
              {t('Submit Your Feedback')}
            </motion.button>
          </div>
        </div>
      </GlassCard>

      {/* Recent Feedback */}
      <GlassCard>
        <h2 className="font-semibold text-sm mb-4 flex items-center gap-2">
          <BarChart3 size={16} className="text-purple-500" /> {t('feedback.recent')}
        </h2>
        <div className="space-y-2">
          {feedbackItems.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-3 rounded-lg bg-black/5 dark:bg-white/5 border-l-2 ${sentimentColor[f.sentiment as keyof typeof sentimentColor]}`}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm">{t(f.msgKey)}</p>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((r) => (
                      <Star key={r} size={10} className={r <= f.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'} />
                    ))}
                  </div>
                  {statusIcon[f.status as keyof typeof statusIcon]}
                  <span className="text-[10px] text-gray-500 capitalize">{f.status}</span>
                </div>
              </div>
              <p className="text-[10px] text-gray-500 mt-1">{t(f.timeKey)}</p>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

// ==================== LANGUAGE PAGE ====================
const LanguagePage = () => {
  const { t, language, setLanguage } = useI18n();
  const [isListening, setIsListening] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', content: t('lang.aiGreeting') },
    { role: 'user', content: t('lang.userQ') },
    { role: 'ai', content: `${t('lang.aiAnswer')} ${t('Want to practice?')}` },
  ]);

  useEffect(() => {
    setChatMessages([
      { role: 'ai', content: t('lang.aiGreeting') },
      { role: 'user', content: t('lang.userQ') },
      { role: 'ai', content: `${t('lang.aiAnswer')} ${t('Want to practice?')}` },
    ]);
  }, [language, t]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) {
      return;
    }
    setChatMessages([...chatMessages, { role: 'user', content: chatInput }]);
    setTimeout(() => {
      setChatMessages((prev) => [...prev, { role: 'ai', content: t("That's a great question! Let me help you with that.") + ' 🚀' }]);
    }, 500);
    setChatInput('');
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    setTimeout(() => {
      setChatInput(t('Can you help me with geometry?'));
      setIsListening(false);
      toast.success(t('Voice input received!'));
    }, 2000);
  };

  return (
    <div className="space-y-7">
      <div className="sticky top-0 z-10 pb-2 mb-1 backdrop-blur-sm bg-gradient-to-b from-gray-100/95 to-gray-100/70 dark:from-gray-900/95 dark:to-gray-900/70">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">{t('lang.title')}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{t('Learn with AI tutor in your preferred language')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Language Selector */}
        <GlassCard glow="purple">
          <h2 className="font-semibold text-sm mb-4 flex items-center gap-2">
            <Globe size={16} className="text-purple-500" /> {t('lang.interface')}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {(['en', 'hi', 'ta', 'te'] as Language[]).map((code) => (
              <motion.button
                key={code}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLanguage(code)}
                className={`p-3 rounded-lg text-sm font-medium transition-all ${
                  language === code
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {languageNames[code]}
              </motion.button>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-lg bg-blue-500/10 text-xs text-gray-600 dark:text-gray-400">
            <p>💡 {t('Tip: Switch language to practice translation and learn new vocabulary!')}</p>
          </div>
        </GlassCard>

        {/* AI Tutor Chat */}
        <GlassCard glow="blue">
          <h2 className="font-semibold text-sm mb-4 flex items-center gap-2">
            <Bot size={16} className="text-blue-500" /> {t('lang.aiTutor')}
          </h2>

          {/* Chat Messages */}
          <div className="space-y-3 mb-4 max-h-80 overflow-y-auto">
            {chatMessages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shrink-0">
                    <Bot size={14} className="text-white" />
                  </div>
                )}
                <div className={`max-w-[70%] p-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-tr-none'
                    : 'bg-black/5 dark:bg-white/5 text-gray-700 dark:text-gray-300 rounded-tl-none'
                }`}>
                  <p className="text-sm">{msg.content}</p>
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center shrink-0">
                    <User size={14} className="text-white" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-black/5 dark:bg-white/5 rounded-lg px-3 py-2 text-sm outline-none border border-white/20 focus:border-blue-500 transition-colors"
              placeholder={t('lang.askTutor')}
            />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleVoiceInput}
              className={`p-2 rounded-lg transition-colors ${isListening ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-blue-500/20 text-blue-500'}`}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => toast.success(t('Text to speech activated! 🔊'))}
              className="p-2 rounded-lg bg-purple-500/20 text-purple-500"
            >
              <Volume2 size={18} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleSendMessage}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold"
            >
              {t('Send')}
            </motion.button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

// ==================== HELP PAGE ====================
const HelpPage = () => {
  const { t } = useI18n();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: t('help.faq1'), a: t('help.answer1') },
    { q: t('help.faq2'), a: t('help.answer2') },
    { q: t('help.faq3'), a: t('help.answer3') },
    { q: t('help.faq4'), a: t('help.answer4') },
  ];

  return (
    <div className="space-y-7">
      <div className="sticky top-0 z-10 pb-2 mb-1 backdrop-blur-sm bg-gradient-to-b from-gray-100/95 to-gray-100/70 dark:from-gray-900/95 dark:to-gray-900/70">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">{t('help.title')}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{t('Get help and learn new skills')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FAQs */}
        <GlassCard glow="blue">
          <h2 className="font-semibold text-sm mb-4 flex items-center gap-2">
            <HelpCircle size={16} className="text-blue-500" /> {t('help.faq')}
          </h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i}>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-3 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{faq.q}</span>
                    <span className="text-blue-500">{openFaq === i ? '−' : '+'}</span>
                  </div>
                </motion.button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-3 text-sm text-gray-600 dark:text-gray-400 bg-blue-500/5 rounded-lg mt-1"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Micro-Learning */}
        <GlassCard glow="purple">
          <h2 className="font-semibold text-sm mb-4 flex items-center gap-2">
            <PlayCircle size={16} className="text-purple-500" /> {t('help.microLearning')}
          </h2>
          <div className="space-y-2">
            {[
              { titleKey: 'help.video.fractions', duration: '3', levelKey: 'Beginner', views: '1.2k', icon: '📊' },
              { titleKey: 'help.video.periodicTable', duration: '5', levelKey: 'Intermediate', views: '892', icon: '🧪' },
              { titleKey: 'help.video.essayTips', duration: '4', levelKey: 'Beginner', views: '2.1k', icon: '✍️' },
              { titleKey: 'help.video.historyTimeline', duration: '8', levelKey: 'Advanced', views: '567', icon: '🌍' },
            ].map((v, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-black/5 dark:bg-white/5 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-all"
              >
                <div className="w-12 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-xl">{v.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{t(v.titleKey)}</p>
                  <div className="flex gap-3 mt-1">
                    <p className="text-[10px] text-gray-500">⏱️ {v.duration} {t('min')}</p>
                    <p className="text-[10px] text-gray-500">📺 {v.views} {t('views')}</p>
                    <p className="text-[10px] text-purple-500">{t(v.levelKey)}</p>
                  </div>
                </div>
                <PlayCircle size={20} className="text-blue-500" />
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Peer Tutors */}
        <GlassCard className="lg:col-span-2">
          <h2 className="font-semibold text-sm mb-4 flex items-center gap-2">
            <Users size={16} className="text-orange-500" /> {t('help.peerTutors')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { name: 'Sarah K.', subject: 'Mathematics', avatar: '👩‍🚀', rating: 4.9, sessions: 128, online: true },
              { name: 'James L.', subject: 'Science', avatar: '👨‍🔬', rating: 4.8, sessions: 95, online: false },
              { name: 'Priya M.', subject: 'English', avatar: '👩‍🏫', rating: 5.0, sessions: 156, online: true },
            ].map((tu, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-black/5 dark:bg-white/5"
              >
                <div className="relative">
                  <span className="text-3xl">{tu.avatar}</span>
                  {tu.online && <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-white dark:border-black" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{tu.name}</p>
                  <p className="text-[10px] text-gray-500">{tu.subject}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star size={10} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-[10px]">{tu.rating}</span>
                    <span className="text-[10px] text-gray-500">• {tu.sessions} sessions</span>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold"
                >
                  {t('Connect')}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

// ==================== LEADERBOARD PAGE ====================
const LeaderboardPage = () => {
  const { t } = useI18n();

  const allPlayers = [
    { name: 'Sarah K.', xp: 5200, avatar: '👩‍🚀', streak: 12, level: 28, badges: 15 },
    { name: 'Alex N.', xp: 4280, avatar: '🧑‍🎓', streak: 5, level: 24, badges: 10 },
    { name: 'Mike R.', xp: 3950, avatar: '🧑‍💻', streak: 8, level: 22, badges: 12 },
    { name: 'Priya M.', xp: 3800, avatar: '👩‍🏫', streak: 10, level: 21, badges: 11 },
    { name: 'James L.', xp: 3600, avatar: '👨‍🔬', streak: 6, level: 20, badges: 9 },
    { name: 'Emma W.', xp: 3200, avatar: '👩‍🎨', streak: 4, level: 18, badges: 8 },
    { name: 'Liam T.', xp: 2900, avatar: '🧑‍🎤', streak: 3, level: 16, badges: 7 },
    { name: 'Nina S.', xp: 2750, avatar: '👩‍⚕️', streak: 7, level: 15, badges: 7 },
  ];

  const top3 = [allPlayers[1], allPlayers[0], allPlayers[2]];

  return (
    <div className="space-y-7">
      <div className="sticky top-0 z-10 pb-2 mb-1 backdrop-blur-sm bg-gradient-to-b from-gray-100/95 to-gray-100/70 dark:from-gray-900/95 dark:to-gray-900/70">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">{t('lb.title')}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{t('Compete and climb the ranks')}</p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4 items-end">
        {top3.map((p, idx) => {
          const positions = [
            { height: 'h-28', order: 1, color: 'from-gray-400 to-gray-500', medal: '🥈' },
            { height: 'h-36', order: 0, color: 'from-yellow-400 to-yellow-500', medal: '👑' },
            { height: 'h-24', order: 2, color: 'from-amber-600 to-amber-700', medal: '🥉' },
          ];
          const pos = positions[idx];
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="text-center"
            >
              <GlassCard glow={idx === 1 ? 'blue' : 'none'} className="flex flex-col items-center">
                <div className="relative">
                  <span className="text-4xl mb-2">{p.avatar}</span>
                  <span className="absolute -top-2 -right-2 text-2xl">{pos.medal}</span>
                </div>
                <p className="font-semibold text-sm">{p.name}</p>
                <p className="text-xs text-blue-500 font-bold">{p.xp.toLocaleString()} XP</p>
                <p className="text-[10px] text-gray-500">{t('Level')} {p.level}</p>
                <div className={`w-full ${pos.height} mt-3 rounded-t-lg bg-gradient-to-t ${pos.color}/20 flex items-end justify-center pb-2`}>
                  <TrophyIcon size={24} className={idx === 1 ? 'text-yellow-400' : 'text-gray-400'} />
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Full Rankings */}
      <GlassCard>
        <h2 className="font-semibold text-sm mb-4 flex items-center gap-2">
          <TrendingUp size={16} className="text-blue-500" /> {t('lb.fullRankings')}
        </h2>
        <div className="space-y-2">
          {allPlayers.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-3 p-3 rounded-lg ${i < 3 ? 'bg-gradient-to-r from-yellow-500/10 to-transparent border-l-4 border-yellow-400' : 'bg-black/5 dark:bg-white/5'}`}
            >
              <div className="w-8 text-center">
                {i === 0 && <Crown size={18} className="text-yellow-400 mx-auto" />}
                {i === 1 && <Medal size={18} className="text-gray-400 mx-auto" />}
                {i === 2 && <Medal size={18} className="text-amber-600 mx-auto" />}
                {i > 2 && <span className="text-xs text-gray-500 font-bold">#{i + 1}</span>}
              </div>
              <span className="text-xl">{p.avatar}</span>
              <span className="text-sm font-medium flex-1">{p.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-orange-500">🔥 {p.streak}d</span>
                <span className="text-xs text-purple-500">⭐ {p.badges}</span>
                <span className="text-sm font-bold text-blue-500">{p.xp.toLocaleString()} XP</span>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

// ==================== REWARDS PAGE ====================
const RewardsPage = () => {
  const { t } = useI18n();
  const { redeemedRewardIds, redeemReward } = useRewards();

  const rewards = rewardsCatalog.map((reward) => {
    const claimable = reward.progress >= reward.stars;
    const redeemed = redeemedRewardIds.includes(reward.id);
    return { ...reward, claimable, redeemed };
  });

  return (
    <div className="space-y-7">
      <div className="sticky top-0 z-10 pb-2 mb-1 backdrop-blur-sm bg-gradient-to-b from-gray-100/95 to-gray-100/70 dark:from-gray-900/95 dark:to-gray-900/70">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">{t('rewards.title')}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{t('rewards.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {rewards.map((reward, index) => {
          const progressPct = Math.min((reward.progress / reward.stars) * 100, 100);
          return (
            <motion.div
              key={reward.title}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard glow="blue" className={`rounded-3xl border ${reward.cardTone}`}>
                <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${reward.iconTone} text-3xl flex items-center justify-center text-white shadow-lg`}>
                  {reward.icon}
                </div>

                <h3 className="mt-5 text-2xl font-black text-center">
                  {t(reward.title)}
                </h3>

                <p className={`mt-2 text-center text-base ${reward.statusTone}`}>
                  {reward.redeemed ? t('Redeemed successfully') : t(reward.status)}
                </p>

                <div className="mt-5 flex items-center justify-center gap-3">
                  <StarIcon size={18} className="fill-purple-500 text-purple-500" />
                  <div className="text-center">
                    <p className="text-xl font-black leading-none">{reward.stars}</p>
                    <p className="text-sm font-semibold uppercase tracking-wide">{t('Stars')}</p>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">{t(reward.caption)}</span>
                    <span className="font-bold">{reward.progress}/{reward.stars}</span>
                  </div>
                  <div className="mt-2 h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPct}%` }}
                      transition={{ duration: 0.8, delay: index * 0.08 }}
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                    />
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    if (!reward.claimable || reward.redeemed) return;
                    redeemReward(reward.id);
                    toast.success(t('Reward redeemed!'), { description: `${t(reward.title)} ${t('has been added to your dashboard.')}` });
                  }}
                  className={`mt-6 w-full py-3 rounded-full text-xl font-bold transition-colors ${
                    reward.redeemed ? 'bg-green-500/20 text-green-500' : reward.buttonTone
                  }`}
                  disabled={!reward.claimable || reward.redeemed}
                >
                  {reward.redeemed ? t('Redeemed') : reward.claimable ? t('Redeem') : t('Locked')}
                </motion.button>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// ==================== MAIN APP ====================
const App: React.FC = () => {
  const { user } = useAuth();
  const [theme, setTheme] = useState<Theme>('dark');
  const [language, setLanguage] = useState<Language>('en');
  const [activeView, setActiveView] = useState('dashboard');
  const [redeemedRewardIds, setRedeemedRewardIds] = useState<string[]>([]);

  const rewardsStorageKey = user
    ? `edusync_redeemed_rewards_${user.rollNumber || user.mobile || user.fullName}`
    : 'edusync_redeemed_rewards_guest';

  const redeemReward = (rewardId: string) => {
    setRedeemedRewardIds((prev) => (prev.includes(rewardId) ? prev : [...prev, rewardId]));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const t = (key: string): string => {
    return translations[language][key] || literalTranslations[language][key] || key;
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const saved = localStorage.getItem(rewardsStorageKey);
    setRedeemedRewardIds(saved ? JSON.parse(saved) : []);
  }, [rewardsStorageKey]);

  useEffect(() => {
    localStorage.setItem(rewardsStorageKey, JSON.stringify(redeemedRewardIds));
  }, [redeemedRewardIds, rewardsStorageKey]);

  const pages: Record<string, React.FC> = {
    dashboard: DashboardPage,
    learning: LearningPage,
    feedback: FeedbackPage,
    language: LanguagePage,
    help: HelpPage,
    leaderboard: LeaderboardPage,
    rewards: RewardsPage,
  };

  const ActivePage = pages[activeView] || DashboardPage;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <RewardsContext.Provider value={{ redeemedRewardIds, redeemReward }}>
        <I18nContext.Provider value={{ language, setLanguage, t }}>
          <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-base leading-relaxed md:text-[17px]">
            <Toaster position="top-right" richColors />
            <div className="flex h-screen overflow-hidden">
              <Sidebar activeView={activeView} onNavigate={setActiveView} />
              <main className="flex-1 overflow-y-auto p-7 md:p-8">
                <TopBar />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeView}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="[&_.text-xs]:text-sm [&_.text-sm]:text-base [&_h2]:text-xl [&_h3]:text-lg [&_svg]:scale-105"
                  >
                    <ActivePage />
                  </motion.div>
                </AnimatePresence>
              </main>
            </div>
          </div>
        </I18nContext.Provider>
      </RewardsContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
