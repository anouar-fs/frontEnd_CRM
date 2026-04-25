import * as AlertDialog from "@radix-ui/react-alert-dialog";
import "./styles.css";
import { Trash } from "lucide-react";

type deleteProps = {
    id:number
    handleDelete: (id: number) => void
}

const AlertDialogDelete = ({id,handleDelete}:deleteProps) => (
	<AlertDialog.Root>
		<AlertDialog.Trigger asChild>
            <button className="danger">
                <Trash className="w-5 h-5 cursor-pointer text-red-500" />
            </button>
		</AlertDialog.Trigger>
		<AlertDialog.Portal>
			<AlertDialog.Overlay className="AlertDialogOverlay" />
			<AlertDialog.Content className="AlertDialogContent">
				<AlertDialog.Title className="AlertDialogTitle">
					Are you absolutely sure?
				</AlertDialog.Title>
				<AlertDialog.Description className="AlertDialogDescription">
					This action cannot be undone. This will permanently delete the
					lead and remove the data from our servers.
				</AlertDialog.Description>
				<div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
					<AlertDialog.Cancel asChild>
						<button className="Button mauve">Cancel</button>
					</AlertDialog.Cancel>
					<AlertDialog.Action asChild>
						<button className="Button red" onClick={()=>handleDelete(id)}>Yes, delete lead</button>
					</AlertDialog.Action>
				</div>
			</AlertDialog.Content>
		</AlertDialog.Portal>
	</AlertDialog.Root>
);

export default AlertDialogDelete;