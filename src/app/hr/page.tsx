import { getJobs, getCandidates, addJob, addCandidate } from '../actions';

export default async function HRDashboard() {
  const jobs = await getJobs();
  const candidates = await getCandidates();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">פאנל מחלקת גיוס</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* העלאת מועמד חדש */}
        <div className="bg-white p-6 rounded-lg shadow border col-span-1 md:col-span-2">
          <h2 className="text-xl font-bold mb-4">מועמדים חדשים</h2>
          <form action={addCandidate} className="mb-6 p-4 bg-gray-50 border rounded">
            <h3 className="font-bold mb-2">הוסף מועמד</h3>
            <div className="flex flex-col gap-3">
              <input name="name" placeholder="שם המועמד" required className="border p-2 rounded" />
              
              <select name="jobId" required className="border p-2 rounded">
                <option value="">בחר משרה...</option>
                {jobs.map((job: any) => (
                  <option key={job.id} value={job.id}>{job.title} ({job.department})</option>
                ))}
              </select>
              
              <div>
                <label className="block mb-1 text-sm font-medium">קורות חיים</label>
                <input type="file" name="cv" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
              </div>
              
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">העלאת מועמד</button>
            </div>
          </form>

          <h3 className="font-bold mb-2">רשימת מועמדים במערכת:</h3>
          <ul className="space-y-2">
            {candidates.length === 0 ? <p className="text-gray-500">אין מועמדים</p> : null}
            {candidates.map((c: any) => (
              <li key={c.id} className="p-3 border rounded flex justify-between items-center">
                <span>{c.name} <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">סטטוס: {c.status}</span></span>
                <span className="text-xs">{jobs.find((j:any) => j.id === c.jobId)?.title || "לא ידוע"}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* הוספת משרה */}
        <div className="bg-white p-6 rounded-lg shadow border col-span-1 md:col-span-2 lg:col-span-3">
          <h2 className="text-xl font-bold mb-4">יצירת משרה חדשה - פורמט דרישת כוח אדם</h2>
          <form action={addJob} className="mb-6 p-4 bg-gray-50 border rounded flex flex-col gap-4">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block mb-1 text-sm font-bold">חטיבה *</label>
                <select name="division" required className="w-full border p-2 rounded text-sm">
                  <option value="">בחירת חטיבה...</option>
                  <option value="אינטגרציה וניסויים">אינטגרציה וניסויים</option>
                  <option value="אימונים">אימונים</option>
                  <option value="אחזקה">אחזקה</option>
                  <option value="תנופ״ה">תנופ"ה</option>
                  <option value="מטה">מטה</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-sm font-bold">מחלקה</label>
                <input name="department" placeholder="הכנס מחלקה" className="w-full border p-2 rounded text-sm" />
              </div>

              <div>
                <label className="block mb-1 text-sm font-bold">שם מנהל מגייס *</label>
                <input name="recruitingManager" placeholder="שם מלא" required className="w-full border p-2 rounded text-sm" />
              </div>

              <div>
                <label className="block mb-1 text-sm font-bold">תאריך פתיחת משרה *</label>
                <input type="date" name="date" required className="w-full border p-2 rounded text-sm" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>

              <div>
                <label className="block mb-1 text-sm font-bold">שם המשרה *</label>
                <input name="title" placeholder="הכנס שם משרה" required className="w-full border p-2 rounded text-sm" />
              </div>

              <div>
                <label className="block mb-1 text-sm font-bold">מספר תקנים נדרשים *</label>
                <input type="number" name="positionsNeeded" min="1" defaultValue="1" required className="w-full border p-2 rounded text-sm" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
              <div>
                <label className="block mb-1 text-sm font-bold">האם התקבל אישור ממנהל המחלקה?</label>
                <div className="flex gap-4 items-center">
                  <label><input type="radio" name="approvedByDeptManager" value="כן" /> כן</label>
                  <label><input type="radio" name="approvedByDeptManager" value="לא" /> לא</label>
                </div>
                <input name="deptManagerNotes" placeholder="הערות במידה וסומן לא" className="w-full mt-2 border p-2 rounded text-sm" />
              </div>

              <div>
                <label className="block mb-1 text-sm font-bold">האם התקבל אישור ממנהל החטיבה?</label>
                <div className="flex gap-4 items-center">
                  <label><input type="radio" name="approvedByDivManager" value="כן" /> כן</label>
                  <label><input type="radio" name="approvedByDivManager" value="לא" /> לא</label>
                </div>
                <input name="divManagerNotes" placeholder="הערות במידה וסומן לא" className="w-full mt-2 border p-2 rounded text-sm" />
              </div>
            </div>

            <div className="border-t pt-4">
              <label className="block mb-2 text-sm font-bold">האם מדובר על תקני החלפה או תוספת?</label>
              <div className="flex flex-col gap-2 text-sm">
                <label><input type="radio" name="positionType" value="החלפה בלבד" /> החלפה בלבד</label>
                <label><input type="radio" name="positionType" value="תוספת בלבד" /> תוספת בלבד</label>
                <label><input type="radio" name="positionType" value="גם החלפה וגם תוספת" /> גם החלפה וגם תוספת</label>
              </div>
            </div>

            <div className="border-t pt-4">
              <label className="block mb-2 text-sm font-bold">מיקום המשרה (ניתן לסמן יותר מאפשרות אחת)</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                {['יוקנעם','תל אביב','מכון דוד','מכון לשם','ג\'וליס','גוש עציון','ירושלים','מרכז הארץ','צפון הארץ','דרום הארץ','חיפה','רחובות','שדמה','Other'].map(loc => (
                   <label key={loc}><input type="checkbox" name="location" value={loc} /> {loc}</label>
                ))}
              </div>
              <input name="mobilityNotes" placeholder="במידה ונדרשת התניידות בין מספר אתרים נא לציין איזה ובאיזה היקף" className="w-full mt-3 border p-2 rounded text-sm" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
              <div>
                <label className="block mb-1 text-sm font-bold">היקף המשרה:</label>
                <select name="scope" className="w-full border p-2 rounded text-sm">
                  <option value="מלאה">מלאה</option>
                  <option value="חלקית">חלקית</option>
                </select>
                <input name="scopeNotes" placeholder="הערות לגבי שעות וימים מיוחדים" className="w-full mt-2 border p-2 rounded text-sm" />
              </div>

              <div>
                <label className="block mb-1 text-sm font-bold">שכר:</label>
                <select name="salaryConfidential" className="w-full border p-2 rounded text-sm">
                  <option value="חסוי">חסוי</option>
                  <option value="לא חסוי">לא חסוי</option>
                </select>
                <input name="salaryRange" placeholder="במידה ולא חסוי, מהו טווח השכר?" className="w-full mt-2 border p-2 rounded text-sm" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 border-t pt-4">
              <div>
                <label className="block mb-1 text-sm font-bold">סוג העסקה</label>
                <select name="employmentType" className="w-full border p-2 rounded text-sm">
                  <option value="שכיר.ה">שכיר.ה</option>
                  <option value="יועץ.ת חיצוני.ת/פרילנסר.ית">יועץ.ת חיצוני.ת/פרילנסר.ית</option>
                  <option value="סטודנט.ית">סטודנט.ית</option>
                  <option value="נוער עד גיל 18">נוער עד גיל 18</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-sm font-bold">התחייבות (ולכמה זמן)?</label>
                <input name="commitment" placeholder="לדוגמה: שנתיים" className="w-full border p-2 rounded text-sm" />
              </div>

              <div>
                <label className="block mb-1 text-sm font-bold">נסיעות לחו"ל?</label>
                <input name="flightsAbroad" placeholder="באיזה היקף" className="w-full border p-2 rounded text-sm" />
              </div>

              <div>
                <label className="block mb-1 text-sm font-bold">סיווג בטחוני נדרש</label>
                <select name="clearance" className="w-full border p-2 rounded text-sm">
                  <option value="">ללא סיווג</option>
                  <option value="רמה 6">רמה 6</option>
                  <option value="רמה 3">רמה 3</option>
                  <option value="אחר">אחר</option>
                </select>
              </div>
            </div>

            <div className="border-t pt-4">
               <label className="block mb-1 text-sm font-bold">רשיון נהיגה</label>
               <div className="flex gap-4 items-center mb-2">
                 <label><input type="radio" name="drivingLicense" value="נדרש" /> נדרש</label>
                 <label><input type="radio" name="drivingLicense" value="לא נדרש" defaultChecked /> לא נדרש</label>
               </div>
               <input name="drivingLicenseType" placeholder="במידה וכן - איזה סוג?" className="w-full border p-2 rounded text-sm" />
            </div>

            <div className="border-t pt-4 grid grid-cols-1 gap-4">
              <div>
                <label className="block mb-1 text-sm font-bold">רקע כללי על התפקיד</label>
                <textarea name="roleBackground" className="w-full border p-2 rounded text-sm" rows={2}></textarea>
              </div>
              <div>
                <label className="block mb-1 text-sm font-bold">דרישות התפקיד</label>
                <textarea name="roleRequirements" className="w-full border p-2 rounded text-sm" rows={3}></textarea>
              </div>
              <div>
                <label className="block mb-1 text-sm font-bold">האם נדרש נסיון? פרט באילו תחומים</label>
                <textarea name="experienceNeeded" className="w-full border p-2 rounded text-sm" rows={2}></textarea>
              </div>
            </div>

            <div className="border-t pt-4">
              <label className="block mb-2 text-sm font-bold">רמת השכלה נדרשת (ניתן לסמן כמה)</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                {[
                  'תעודת הנדסאי.ת', 'תעודת מהנדס.ת', 'תואר ראשון', 'תואר שני', 
                  'בגרות מלאה', 'תעודת טכנאי.ת', 'קורס מקצועי', 'הסמכה מקצועית',
                  'ללא צורך בתעודה כלשהי'
                ].map(ed => (
                   <label key={ed}><input type="checkbox" name="education" value={ed} /> {ed}</label>
                ))}
              </div>
              <div className="mt-3">
                <label className="block mb-1 text-sm font-bold">תחום לימוד מבוקש</label>
                <input name="studyField" className="w-full border p-2 rounded text-sm" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
              <div>
                <label className="block mb-1 text-sm font-bold">רקע צבאי מבוקש? (פרט איזה)</label>
                <input name="militaryBackground" className="w-full border p-2 rounded text-sm" />
              </div>
              <div>
                <label className="block mb-1 text-sm font-bold">רמת אנגלית דרושה</label>
                <select name="englishLevel" className="w-full border p-2 rounded text-sm">
                  <option value="לא נדרש">לא נדרש</option>
                  <option value="רמה בסיסית">רמה בסיסית</option>
                  <option value="רמה בינונית">רמה בינונית</option>
                  <option value="רמה גבוהה">רמה גבוהה</option>
                </select>
              </div>
            </div>

            <div className="border-t pt-4">
               <label className="block mb-1 text-sm font-bold">הערות נוספות כלליות במידה וישנן</label>
               <textarea name="generalNotes" className="w-full border p-2 rounded text-sm" rows={2}></textarea>
            </div>
            
            <div className="border-t pt-4 flex justify-between items-center">
               <p className="text-xs text-gray-500">ניתן להוסיף קובץ תיאור משרה באמצעות המערכת בהמשך</p>
               <button type="submit" className="bg-green-600 text-white font-bold px-8 py-3 rounded text-lg shadow-md hover:bg-green-700">הוספת משרה חדשה</button>
            </div>
          </form>

          <h3 className="font-bold mb-2">משרות פתוחות אחרונות שנוצרו:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {jobs.length === 0 ? <p className="text-gray-500">אין משרות</p> : null}
            {jobs.map((job: any) => (
              <div key={job.id} className="border p-3 rounded">
                <span className="font-bold block">{job.title}</span>
                <span className="text-xs text-gray-500 block">חטיבה: {job.division} | מחלקה: {job.department || '-'} | מגייס: {job.recruitingManager}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}