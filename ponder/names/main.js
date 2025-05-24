
const students = [
    {
        last: 'Banks',
        first: 'Joao'
    },
    {
        last: 'Bingham',
        first: 'Brynlee'
    },
    {
        last: 'Cardiel',
        first: 'Jonathan'
    },
    {
        last: 'DeWitt',
        first: 'Luce'
    },
    {
        last: 'Durtschi',
        first: 'Dylan'
    },
    {
        last: 'Ericson',
        first: 'Amanda'
    },
    {
        last: 'Guo',
        first: 'Huanru'
    },
    {
        last: 'Gross',
        first: 'Gabriel'
    },
    {
        last: 'Hafen',
        first: 'Bronwyn'
    },
    {
        last: 'Hamblin',
        first: 'Jacob'
    },
    {
        last: 'Hatakenaka',
        first: 'Kosei'
    },
    {
        last: 'Haymond',
        first: 'Zachary'
    },
    {
        last: 'Hill',
        first: 'Tylar'
    },
    {
        last: 'Jones',
        first: 'Brayden'
    },
    {
        last: 'Jones',
        first: 'Kyle'
    },
    {
        last: 'Kinner',
        first: 'Sarah'
    },
    {
        last: 'Kokona',
        first: 'Alexander'
    },
    {
        last: 'Larsen',
        first: 'Joshua'
    },
    {
        last: 'Legg',
        first: 'Russell'
    },
    {
        last: 'Lewis',
        first: 'Teagan'
    },
    {
        last: 'Lucas',
        first: 'Thomas'
    },
    {
        last: 'Mackay',
        first: 'Levi'
    },
    {
        last: 'Maynes',
        first: 'William'
    },
    {
        last: 'Moffat',
        first: 'Luke'
    },
    {
        last: 'Morrell',
        first: 'Jaxon'
    },
    {
        last: 'Niemand',
        first: 'Samuel'
    },
    {
        last: 'Olisa',
        first: 'Benedict'
    },
    {
        last: 'Olson',
        first: 'Hayden'
    },
    {
        last: 'Palacios',
        first: 'Alexander'
    },
    {
        last: 'Patil',
        first: 'Raj'
    },
    {
        last: 'Petersen',
        first: 'Eric'
    },
    {
        last: 'Rich',
        first: 'Aaron'
    },
    {
        last: 'Schaefermeyer',
        first: 'Kelsey'
    },
    {
        last: 'Stubbs',
        first: 'Camden'
    },
    {
        last: 'Tenney',
        first: 'Isaac'
    },
    {
        last: 'Tolley',
        first: 'Joseph'
    },
    {
        last: 'Uchytil',
        first: 'Heber'
    },
    {
        last: 'Vickery',
        first: 'Mel'
    },
    {
        last: 'Zaugg',
        first: 'Nephi'
    },
    {
        last: 'Zhou',
        first: 'Shengjian'
    }
];

students.sort((a, b) => {
    const full_a = a.first + a.last;
    const full_b = b.first + b.last;
    return full_a > full_b;
});

const student_container = document.getElementById("student_container");
students.forEach((student) => {
    const id_upper = student.first + '_' + student.last;
    student_container.innerHTML += `
        <p class="student" id=${id_upper.toLowerCase()}>
            ${student.first} ${student.last}
        </p>
    `;
});