'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

const dbPath = path.join(process.cwd(), 'db.json');

async function getDb() {
  try {
    const data = await fs.readFile(dbPath, 'utf8');
    return JSON.parse(data);
  } catch {
    const defaultData = { jobs: [], candidates: [], onboarding: [] };
    await fs.writeFile(dbPath, JSON.stringify(defaultData));
    return defaultData;
  }
}

async function saveDb(db: any) {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
}

export async function getJobs() {
  const db = await getDb();
  return db.jobs;
}

export async function addJob(formData: FormData) {
  const db = await getDb();
  const reqLocations = formData.getAll('location');
  const reqEducation = formData.getAll('education');

  const newJob = {
    id: Date.now().toString(),
    title: formData.get('title'),
    division: formData.get('division'),
    department: formData.get('department'),
    recruitingManager: formData.get('recruitingManager'),
    date: formData.get('date'),
    approvedByDeptManager: formData.get('approvedByDeptManager'),
    deptManagerNotes: formData.get('deptManagerNotes'),
    approvedByDivManager: formData.get('approvedByDivManager'),
    divManagerNotes: formData.get('divManagerNotes'),
    positionsNeeded: formData.get('positionsNeeded'),
    positionType: formData.get('positionType'),
    location: reqLocations,
    mobilityNotes: formData.get('mobilityNotes'),
    scope: formData.get('scope'),
    scopeNotes: formData.get('scopeNotes'),
    salaryConfidential: formData.get('salaryConfidential'),
    salaryRange: formData.get('salaryRange'),
    employmentType: formData.get('employmentType'),
    commitment: formData.get('commitment'),
    flightsAbroad: formData.get('flightsAbroad'),
    clearance: formData.get('clearance'),
    drivingLicense: formData.get('drivingLicense'),
    drivingLicenseType: formData.get('drivingLicenseType'),
    roleBackground: formData.get('roleBackground'),
    roleRequirements: formData.get('roleRequirements'),
    experienceNeeded: formData.get('experienceNeeded'),
    education: reqEducation,
    studyField: formData.get('studyField'),
    militaryBackground: formData.get('militaryBackground'),
    englishLevel: formData.get('englishLevel'),
    generalNotes: formData.get('generalNotes'),
    created: new Date().toISOString()
  };
  db.jobs.push(newJob);
  await saveDb(db);
  revalidatePath('/hr');
  revalidatePath('/manager');
}

export async function getCandidates() {
  const db = await getDb();
  return db.candidates;
}

export async function addCandidate(formData: FormData) {
  const db = await getDb();
  const cvFile = formData.get('cv') as File;
  let cvUrl = '';
  if (cvFile && cvFile.name && cvFile.name !== 'undefined') {
    cvUrl = cvFile.name;
  }

  const newCandidate = {
    id: Date.now().toString(),
    name: formData.get('name'),
    jobId: formData.get('jobId'),
    status: 'new',
    cvUrl,
    feedback: '',
    created: new Date().toISOString()
  };
  db.candidates.push(newCandidate);
  await saveDb(db);
  revalidatePath('/hr');
  revalidatePath('/manager');
}

export async function addReview(formData: FormData) {
  const db = await getDb();
  const candidateId = formData.get('candidateId');
  const feedback = formData.get('feedback');
  
  const candidate = db.candidates.find((c: any) => c.id === candidateId);
  if (candidate) {
    candidate.feedback = feedback;
    candidate.status = 'reviewed';
    await saveDb(db);
  }
  revalidatePath('/manager');
  revalidatePath('/hr');
}

export async function saveOnboarding(formData: FormData) {
  const db = await getDb();
  const newOnboarding = {
    id: Date.now().toString(),
    candidateName: formData.get('candidateName'),
    shirtSize: formData.get('shirtSize'),
    shoeSize: formData.get('shoeSize'),
    created: new Date().toISOString()
  };
  db.onboarding.push(newOnboarding);
  await saveDb(db);
  revalidatePath('/onboarding');
} 
