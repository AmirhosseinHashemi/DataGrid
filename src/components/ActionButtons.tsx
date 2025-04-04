import DeleteBtn from "@/components/DeleteBtn.tsx";
import EditBtn from "@/components/EditBtn.tsx";

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

function ActionButtons({ rowData }: { rowData: rowData }) {
  return (
    <div className="flex items-center gap-2">
      <DeleteBtn rowId={rowData.id} />
      <EditBtn rowId={rowData.id} />
    </div>
  );
}

export default ActionButtons;
