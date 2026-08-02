import { saveOnboarding } from '../actions';

export default function OnboardingDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">קליטת עובדים וציוד</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-bold mb-4">טפסים והצהרות חובה</h2>
          <div className="space-y-3">
            <a href="c:\Users\gilad\Desktop\תיק נהג אמרל.pdf" target="_blank" className="block p-3 border rounded hover:bg-gray-50 flex items-center justify-between">
              <span>📄 תיק נהג אמרל</span>
              <span className="text-xs text-blue-600">הורד קובץ</span>
            </a>
            <a href="c:\Users\gilad\Desktop\הצהרת נוהג ברכב אמרל.pdf" target="_blank" className="block p-3 border rounded hover:bg-gray-50 flex items-center justify-between">
              <span>📄 הצהרת נוהג ברכב אמרל</span>
              <span className="text-xs text-blue-600">הורד קובץ</span>
            </a>
            <a href="c:\Users\gilad\Desktop\טופס למבחן מעשי בנהיגה-1.pdf" target="_blank" className="block p-3 border rounded hover:bg-gray-50 flex items-center justify-between">
              <span>📄 טופס למבחן מעשי בנהיגה</span>
              <span className="text-xs text-blue-600">הורד קובץ</span>
            </a>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-bold mb-4">ניהול ביגוד וציוד מגן</h2>
          <p className="mb-4 text-gray-600 text-sm">יש למלא את מידות העובד/ת לפני תחילת העבודה בשטח.</p>
          
          <form action={saveOnboarding} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">שם העובד שנקלט</label>
              <input type="text" name="candidateName" required className="w-full border rounded p-2" placeholder="לדוגמה: משה כהן" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">מידת חולצה</label>
              <select name="shirtSize" className="w-full border rounded p-2">
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
                <option>XXL</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">מידת נעלי עבודה</label>
              <input type="number" name="shoeSize" required className="w-full border rounded p-2" min="36" max="50" placeholder="לדוגמה: 42" />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">שמירת נתוני השמה</button>
          </form>
        </div>
      </div>
    </div>
  );
}