import { useGetNotesQuery } from "./noteApiSlice"
import Note from "./Note"

const NotesList = () => {
    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery('notesList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = notes

        const tableContent = ids?.length
            ? ids.map(noteId => <Note key={noteId} noteId={noteId} />)
            : null

        content = (
            <div className="table-container w-full mt-8 flex justify-center">
                <table className="table-auto w-[50%] text-center border-2 border-green-400">
                    <thead className="bg-green-400">
                        <tr className="border-b-2 border-green-400">
                            <th scope="col" className="p-2">Username</th>
                            <th scope="col" className="p-2">Title</th>
                            <th scope="col" className="p-2">Owner</th>
                            <th scope="col" className="p-2">Created</th>
                            <th scope="col" className="p-2">Updated</th>
                            <th scope="col" className="p-2">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableContent}
                    </tbody>
                </table>
            </div>
        )
    }

    return content
}
export default NotesList