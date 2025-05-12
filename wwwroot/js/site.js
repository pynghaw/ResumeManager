// 👉 Automatically preview uploaded image
document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("customFile");
    if (fileInput) {
        fileInput.addEventListener("change", function () {
            const file = this.files[0];
            if (file) {
                document.getElementById("PreviewPhoto").src = URL.createObjectURL(file);
            }
        });
    }
});

// 👉 Safely calculate total years of experience
function CalcTotalExperiences() {
    const yearsInputs = document.getElementsByClassName('YearsWorked');
    let totalExp = 0;

    for (let i = 0; i < yearsInputs.length; i++) {
        const value = parseFloat(yearsInputs[i].value);
        if (!isNaN(value)) {
            totalExp += value;
        }
    }

    const totalInput = document.getElementById('TotalExperience');
    if (totalInput) {
        totalInput.value = totalExp;
    }
}

// 👉 Recalculate experience total on input change
document.addEventListener('change', function (e) {
    if (e.target.classList.contains('YearsWorked')) {
        CalcTotalExperiences();
    }
}, false);

// 👉 Delete experience row (hide it and mark as deleted)
function DeleteItem(btn) {
    const table = document.getElementById('ExpTable');
    const rows = table.getElementsByTagName('tr');

    if (rows.length <= 2) {
        alert("At least one experience is required.");
        return;
    }

    const btnIdx = btn.id.replace('btnremove-', '');
    const idofIsDeleted = btnIdx + '__IsDeleted';
    const hiddenInput = document.querySelector(`[id$='${idofIsDeleted}']`);

    if (hiddenInput) {
        hiddenInput.value = true;
    }

    btn.closest("tr").style.display = "none";
    CalcTotalExperiences();
}

// 👉 Add new experience row dynamically
function AddItem(btn) {
    const table = document.getElementById('ExpTable');
    const rows = table.getElementsByTagName('tr');
    const lastrowIdx = rows.length - 2;
    const nextrowIdx = lastrowIdx + 1;

    let rowHtml = rows[rows.length - 1].outerHTML;

    rowHtml = rowHtml.replaceAll(`[${lastrowIdx}]`, `[${nextrowIdx}]`);
    rowHtml = rowHtml.replaceAll(`_${lastrowIdx}__`, `_${nextrowIdx}__`);
    rowHtml = rowHtml.replaceAll(`-${lastrowIdx}`, `-${nextrowIdx}`);

    const newRow = table.insertRow();
    newRow.innerHTML = rowHtml;

    // Clear input fields in the new row
    const inputs = newRow.querySelectorAll("input");
    inputs.forEach(input => {
        if (input.type === "text" || input.type === "number") {
            input.value = input.type === "text" ? "" : 0;
        }
    });

    rebindValidators();
    CalcTotalExperiences();
}

// 👉 Rebind jQuery validation after DOM updates
function rebindValidators() {
    const $form = $("#ApplicantForm");

    $form.unbind();
    $form.data("validator", null);
    $.validator.unobtrusive.parse($form);
    $form.validate($form.data("unobtrusiveValidation").options);
}
