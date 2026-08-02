import { getCandidates, getJobs, addReview } from '../actions';

export default async function ManagerDashboard() {
  const candidates = await getCandidates();
  const jobs = await getJobs();
  
  // מועמדים שעדיין לא קיבלו חוות דעת
  const pendingCandidates = candidates.filter((c: any) => c.status === 'new');
  // מועמדים שקיבלו חוות דעת
  const reviewedCandidates = candidates.filter((c: any) => c.status === 'reviewed');

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">פאנל מנהל מגייס</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-bold mb-4">מועמדים לראיון / חוות דעת</h2>
          
          <div className="mt-4 space-y-4">
            {pendingCandidates.length === 0 ? <p className="text-gray-500">אין מועמדים שממתינים לטיפולך</p> : null}
            
            {pendingCandidates.map((c: any) => (
              <div key={c.id} className="border p-4 rounded bg-gray-50 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">{c.name}</p>
                    <p className="text-sm text-gray-500">עבור: {jobs.find((j:any) => j.id === c.jobId)?.title || "לא ידוע"}</p>
                    {c.cvUrl && <p className="text-xs text-blue-600 mt-1">📎 קובץ: {c.cvUrl}</p>}
                  </div>
                </div>
                
                <form action={addReview} className="mt-2 border-t pt-2 flex flex-col gap-2">
                  <input type="hidden" name="candidateId" value={c.id} />
                  <textarea name="feedback" placeholder="חוות דעת לאחר ראיון / סינון..." required className="w-full border p-2 rounded text-sm min-h-[80px]"></textarea>
                  <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded self-end text-sm">הגש חוות דעת</button>
                </form>
              </div>
            ))}
          </div>

          {reviewedCandidates.length > 0 && (
            <div className="mt-8 pt-6 border-t">
              <h3 className="font-bold mb-3">מועמדים שדורגו על ידך:</h3>
              <ul className="space-y-3">
                {reviewedCandidates.map((c: any) => (
                  <li key={c.id} className="p-3 border rounded bg-green-50">
                    <p className="font-bold">{c.name}</p>
                    <p className="text-sm">"{c.feedback}"</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-bold mb-4">תובנות ה-AI וסיכומים</h2>
          <div className="bg-blue-50 text-blue-800 p-4 rounded-lg space-y-3">
            <p className="font-bold">💡 טיפים לראיונות היום</p>
            <ul className="list-disc pr-5 text-sm space-y-2">
              <li>עבור משרת <strong>{jobs.length > 0 ? jobs[0].title : "מנהל מערכות"}</strong> - זכור לשאול על ניסיון קודם בפרויקטים דומים.</li>
              <li>{pendingCandidates.length > 0 ? `ישנם ${pendingCandidates.length} קורות חיים שממתינים לחוות דעתך.` : `סיימת לעבור על כל קורות החיים.`}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}