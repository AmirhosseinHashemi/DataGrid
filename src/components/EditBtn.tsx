import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AgGridReact } from "ag-grid-react";
import EditaDataGrid from "@/components/EditaDataGrid.tsx";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRowData } from "@/api/services.ts";
import toast from "react-hot-toast";

interface rowData {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

function EditBtn({ rowId }: { rowId: number }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const gridRef = useRef<AgGridReact>(null);
  const mutation = useMutation({
    mutationFn: updateRowData,
    onSuccess: (data) => {
      console.log(data);
      toast.success("Successfully updated data");
      queryClient.invalidateQueries({
        queryKey: ["rows"],
      });
      setOpen(false);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleUpdate = () => {
    const updatedRows: rowData[] = [];

    gridRef.current?.api.forEachNode((node) => {
      if (node.data) {
        updatedRows.push(node.data);
      }
    });

    mutation.mutate(updatedRows[0]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Edit row {rowId}</DialogTitle>
          <DialogDescription>
            Make changes to your row data here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="w-full h-[300px]">
          <EditaDataGrid gridRef={gridRef} rowId={rowId} />
        </div>

        <DialogFooter>
          <Button type="submit" onClick={handleUpdate} className={`${mutation.isPending ? 'cursor-not-allowed opacity-50' : ''}`}>
            {mutation.isPending ? "saving ..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditBtn;
