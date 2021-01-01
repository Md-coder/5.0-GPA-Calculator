const tableForm = document.getElementById('table');
tableForm.style.display = 'none';
const calBtn = document.getElementById('calculate');
const result = document.querySelector('.results');
result.style.display = 'none';
const loading2 = document.getElementById('loading2');
loading2.style.display = 'none';
const gpHeading = document.querySelector('.gp-heading');
// the refresh button
const refresh = document.getElementById('refresh');


document.getElementById('calculator').addEventListener('submit', function (e) {
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculate, 2000);
    e.preventDefault();
});

// adding functionality to the refresh button
refresh.addEventListener('click', function (e) {
    window.location.reload();
    e.preventDefault();
})


function calculate() {


    document.getElementById('loading').style.display = 'none';

    const noCourses = document.getElementById('noCourses');
    const table = document.querySelector('tbody');
    let courses = parseInt(noCourses.value);
    if (isNaN(courses) || courses > 15 || courses === 0) {
        showError('Sorry Please Check Your Input');

    } else {
        // show the calculate btn
        calBtn.style.display = 'block'
        for (let i = 1; i <= courses; i++) {
            // const table = document.querySelector('tbody');
            // showing the table once submit validation is correct
            tableForm.style.display = 'block';
            // creating each table based on the number of courses
            const row = document.createElement('tr');
            const th = document.createElement('th');
            th.innerText = i;
            row.appendChild(th);

            // creating td 
            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            const td3 = document.createElement('td');

            // creating input element
            const input1 = document.createElement('input');
            input1.id = `course${i}`;
            input1.type = 'text';


            const input2 = document.createElement('input');
            input2.id = `unit${i}`;
            input2.type = 'number';


            const input3 = document.createElement('input');
            input3.id = 'grade' + i;
            input3.type = 'text';

            // appending
            td1.appendChild(input1);
            td2.appendChild(input2);
            td3.appendChild(input3);

            row.appendChild(td1);
            row.appendChild(td2);
            row.appendChild(td3);

            table.appendChild(row);
        }
    }
    document.getElementById('name').disabled = true;
    noCourses.disabled = true;
    document.getElementById('department').disabled = true;
    document.getElementById('level').disabled = true;

    // calculateGpa()

    calBtn.addEventListener('click', function (e) {
        // enforcing the loading function for just User Experience
        loading2.style.display = 'block';
        // setting a timmer before display of result
        setTimeout(calculateGpa, 3000);
        e.preventDefault();
    });


}



function showError(error) {
    // create new element
    const errorDiv = document.createElement('div');

    // give the new element a class
    errorDiv.className = 'alert alert-danger';

    // input the errortext
    errorDiv.appendChild(document.createTextNode(error));

    // get card element and heading
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    card.insertBefore(errorDiv, heading);

    setTimeout(clearError, 3000)

}



function clearError() {
    document.querySelector('.alert').remove();
    window.location.reload();
}


function calculateGpa() {

    loading2.style.display = 'none';
    gpHeading.style.display = 'none';

    // Here we make the real GPA calculation
    const table = document.getElementById('table-id');
    const count = table.rows.length;
    let accumulatedScore = 0;
    let sumUnit = 0;
    let CPGA = 0;



    // loop through
    for (let i = 1; i <= count; i++) {
        const un = document.querySelector(`#unit${i}`).value;
        const gr = document.getElementById(`grade${i}`).value.toUpperCase();
        // const grade = gr.value.toUpperCase;
        const unit = parseInt(un);
        // showing the result block
        accumulatedScore += accumulation(gr, unit);
        sumUnit += Math.floor(un);
    }

    CPGA = (accumulatedScore / sumUnit).toFixed(2);
    document.getElementById('gpa').value = CPGA;
    document.getElementById('name-result').value = document.getElementById('name').value;
    document.getElementById('level-result').value = document.getElementById('level').value;
    document.getElementById('department-result').value = document.getElementById('department').value;
    result.style.display = 'block';

    // creating the class division using the if statement to validate the CGPA;

    if (CPGA >= 4.5 && CPGA <= 5.0) {
        return document.getElementById('class').value = 'First Class Honours';
    } else if (CPGA >= 3.5 && CPGA <= 4.49) {
        return document.getElementById('class').value = 'Second Class Honours (Upper Division)';
    } else if (CPGA >= 2.40 && CPGA <= 3.49) {
        return document.getElementById('class').value = 'Secon Class Honours (Lower Division)';
    } else if (CPGA >= 1.50 && CPGA <= 2.39) {
        return document.getElementById('class').value = 'Third Class Honours';
    } else if (CPGA >= 1.00 && CPGA <= 1.49) {
        return document.getElementById('class').value = 'Pass';
    } else
        document.getElementById('class').value = 'Something must definitely be wrong,We dont believe you failed.';





}

function accumulation(grade, unit) {


    switch (grade) {
        case 'A':
            return 5 * unit;
            break;
        case 'B':
            return 4 * unit;
            break;
        case 'C':
            return 3 * unit;
            break;
        case 'D':
            return 2 * unit;
            break;
        case 'E':
            return 1 * unit;
            break;
        case 'F':
            return 0 * unit;
            break;
        default:
            return 0 * unit;

    }
}