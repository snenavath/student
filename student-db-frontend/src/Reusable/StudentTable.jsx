import moment from "moment";

export const StudentTable = ({
  tableData,
  tableHeaders,
  showButtons,
  setEdit,
  deleteStudent,
}) => {
  return (
    <div className="flex flex-col my-5">
      <div className="overflow-x-auto">
        <div className="w-full inline-block align-middle">
          <div className="overflow-scroll border rounded-l">
            <table className="min-w-full divide-y divide-grey-300">
              <thead className="bg-gray-100">
                <tr>
                  {tableHeaders.map((header) => {
                    return (
                      <th
                        scope="col"
                        className="px-5 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                      >
                        {header}
                      </th>
                    );
                  })}

                  {showButtons && (
                    <th
                      scope="col"
                      className="px-5 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    ></th>
                  )}
                  {showButtons && (
                    <th
                      scope="col"
                      className="px-5 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    ></th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tableData.map((tableRow) => {
                  const { id, firstName, lastName, dob } = tableRow;
                  return (
                    <tr>
                      <td className="px-5 py-4 text-sm font-normal text-gray-00 whitespace-nowrap capitalize">
                        {firstName}
                      </td>
                      <td className="px-5 py-4 text-sm font-normal text-gray-00 whitespace-nowrap capitalize">
                        {lastName}
                      </td>
                      <td className="px-5 py-4 text-sm font-normal text-gray-00 whitespace-nowrap capitalize">
                        {moment(dob,"YYYY-MM-DD").format("Do MMMM YYYY")}
                      </td>

                      {showButtons && (
                        <td
                          className="px-5 py-4 text-sm font-bold text-right whitespace-nowrap"
                          onClick={() => {
                            setEdit(tableRow["_id"]);
                          }}
                        >
                          <a
                            className="text-blue-400 hover:text-blue-600"
                            href="#"
                          >
                            Edit
                          </a>
                        </td>
                      )}
                      {showButtons && (
                        <td
                          className="px-5 py-4 text-sm font-bold text-right whitespace-nowrap"
                          onClick={() => {
                            deleteStudent(tableRow["_id"]);
                          }}
                        >
                          <a
                            className="text-red-500 hover:text-red-700"
                            href="#"
                          >
                            Delete
                          </a>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
