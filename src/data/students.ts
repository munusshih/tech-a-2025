// Student data with names, emails, and optional website links
export interface Student {
    firstName: string;
    lastName: string;
    email: string;
    website?: string;
    studentId?: string; // URL-friendly identifier
}

export const students: Student[] = [
    {
        firstName: "Bella",
        lastName: "Tsai",
        email: "ytsai13@pratt.edu",
        website: null,
        studentId: "bella-tsai",
    },
    {
        firstName: "Binjia",
        lastName: "Li",
        email: "blix21@pratt.edu",
        website: null,
        studentId: "binjia-li",
    },
    {
        firstName: "Flora",
        lastName: "Fang",
        email: "zfang32@pratt.edu",
        website: null,
        studentId: "flora-fang",
    },
    {
        firstName: "Kate",
        lastName: "Chon",
        email: "kchon351@pratt.edu",
        website: null,
        studentId: "kate-chon",
    },
    {
        firstName: "Lina",
        lastName: "Lee",
        email: "jlee413@pratt.edu",
        website: null,
        studentId: "lina-lee",
    },
    {
        firstName: "Lin",
        lastName: "Kim",
        email: "ckim109@pratt.edu",
        website: null,
        studentId: "lin-kim",
    },
    {
        firstName: "Nancy",
        lastName: "Scanlon",
        email: "nscanl13@pratt.edu",
        website: null,
        studentId: "nancy-scanlon",
    },
    {
        firstName: "Richard",
        lastName: "Fu",
        email: "jfux34@pratt.edu",
        website: null,
        studentId: "richard-fu",
    },
    {
        firstName: "Sarena",
        lastName: "Yadav",
        email: "syadav4@pratt.edu",
        website: null,
        studentId: "sarena-yadav",
    },
    {
        firstName: "Sreya",
        lastName: "Mahsin",
        email: "smahsin@pratt.edu",
        website: null,
        studentId: "sreya-mahsin",
    },
    {
        firstName: "Yiling",
        lastName: "Yang",
        email: "yyang82@pratt.edu",
        website: null,
        studentId: "yiling-yang",
    },
    {
        firstName: "Zoe",
        lastName: "Liu",
        email: "yliu124@pratt.edu",
        website: null,
        studentId: "zoe-liu",
    },
];// Create a mapping from email to student data for quick lookups
export const studentsByEmail = students.reduce((acc, student) => {
    acc[student.email] = student;
    return acc;
}, {} as Record<string, Student>);

// Sort students alphabetically by first name for display
export const studentsSorted = [...students].sort((a, b) =>
    a.firstName.localeCompare(b.firstName)
);
