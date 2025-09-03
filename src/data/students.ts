// Student data with names, emails, and optional website links
export interface Student {
    firstName: string;
    lastName: string;
    email: string;
    website?: string;
}

export const students: Student[] = [
    {
        firstName: "Bella",
        lastName: "Tsai",
        email: "ytsai13@pratt.edu",
        website: null,
    },
    {
        firstName: "Binjia",
        lastName: "Li",
        email: "blix21@pratt.edu",
        website: null,
    },
    {
        firstName: "Flora",
        lastName: "Fang",
        email: "zfang32@pratt.edu",
        website: null,
    },
    {
        firstName: "Kate",
        lastName: "Chon",
        email: "kchon351@pratt.edu",
        website: null,
    },
    {
        firstName: "Lina",
        lastName: "Lee",
        email: "jlee413@pratt.edu",
        website: null,
    },
    {
        firstName: "Lin",
        lastName: "Kim",
        email: "ckim109@pratt.edu",
        website: null,
    },
    {
        firstName: "Nancy",
        lastName: "Scanlon",
        email: "nscanl13@pratt.edu",
        website: null,
    },
    {
        firstName: "Richard",
        lastName: "Fu",
        email: "jfux34@pratt.edu",
        website: null,
    },
    {
        firstName: "Sarena",
        lastName: "Yadav",
        email: "syadav4@pratt.edu",
        website: null,
    },
    {
        firstName: "Sreya",
        lastName: "Mahsin",
        email: "smahsin@pratt.edu",
        website: null,
    },
    {
        firstName: "Yiling",
        lastName: "Yang",
        email: "yyang82@pratt.edu",
        website: null,
    },
    {
        firstName: "Zoe",
        lastName: "Liu",
        email: "yliu124@pratt.edu",
        website: null,
    },
];

// Create a mapping from email to student data for quick lookups
export const studentsByEmail = students.reduce((acc, student) => {
    acc[student.email] = student;
    return acc;
}, {} as Record<string, Student>);

// Sort students alphabetically by first name for display
export const studentsSorted = [...students].sort((a, b) =>
    a.firstName.localeCompare(b.firstName)
);
