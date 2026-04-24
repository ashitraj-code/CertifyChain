export default function Table({ columns, data, onRowClick }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-surface-container-high">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-surface-container-low border-b border-surface-container-high">
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-on-surface-variant"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              onClick={() => onRowClick?.(row)}
              className={`border-b border-surface-container-high last:border-0
                ${onRowClick ? 'cursor-pointer hover:bg-surface-container-low' : ''}
                transition-colors duration-150`}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-5 py-4 text-on-surface">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
