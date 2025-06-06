import React from "react";

interface Expense {
  id: string;
  date: string;
  description: string;
  amount: number;
}

interface ExpenseTableProps {
  expenses: Expense[];
  onAddExpense?: () => void;
  onEditExpense?: (id: string) => void;
  onDeleteExpense?: (id: string) => void;
}

const ExpenseTable: React.FC<ExpenseTableProps> = ({
  expenses,
  onAddExpense,
  onEditExpense,
  onDeleteExpense,
}) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Expenses</h3>
        {onAddExpense && (
          <button
            onClick={onAddExpense}
            className="rounded-md bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-700"
          >
            Add Expense
          </button>
        )}
      </div>

      {expenses.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No expenses added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="border px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Date
                </th>
                <th className="border px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Description
                </th>
                <th className="border px-4 py-2 text-right text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Amount (₹)
                </th>
                {(onEditExpense || onDeleteExpense) && (
                  <th className="border px-4 py-2 text-center text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="border-t hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                >
                  <td className="border px-4 py-2 text-sm">{new Date(expense.date).toLocaleDateString()}</td>
                  <td className="border px-4 py-2 text-sm">{expense.description}</td>
                  <td className="border px-4 py-2 text-sm text-right">
                    ₹{expense.amount.toLocaleString()}
                  </td>
                  {(onEditExpense || onDeleteExpense) && (
                    <td className="border px-4 py-2 text-center text-sm space-x-2">
                      {onEditExpense && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditExpense(expense.id);
                          }}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                      )}
                      {onDeleteExpense && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteExpense(expense.id);
                          }}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExpenseTable;
