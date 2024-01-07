const expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category-select');
const otherCategoryInput = document.getElementById('other-category');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

categorySelect.addEventListener('change', function () {
    if (categorySelect.value === 'Other') {
        otherCategoryInput.style.display = 'inline-block';
    } else {
        otherCategoryInput.style.display = 'none';
    }
});

addBtn.addEventListener('click', function () {
    let category = categorySelect.value;

    if (category === 'Other') {
        category = otherCategoryInput.value.trim();
        if (category === '') {
            alert('Please enter a category');
            return;
        }
    }

    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '' || isNaN(amount) || amount <= 0 || date === '') {
        alert('Please enter valid information for all fields');
        return;
    }

    expenses.push({ category, amount, date });
    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;

    const newRow = expenseTableBody.insertRow();
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');

    deleteBtn.addEventListener('click', function () {
        const row = this.parentNode.parentNode;
        const index = row.rowIndex - 1;
        const deletedAmount = expenses[index].amount;

        expenses.splice(index, 1);
        totalAmount -= deletedAmount;
        totalAmountCell.textContent = totalAmount;
        row.parentNode.removeChild(row);
    });

    categoryCell.textContent = category;
    amountCell.textContent = amount;
    dateCell.textContent = date;
    deleteCell.appendChild(deleteBtn);

    categorySelect.value = 'College Fee';
    amountInput.value = '';
    dateInput.value = '';
    otherCategoryInput.style.display = 'none';
    otherCategoryInput.value = '';
});
