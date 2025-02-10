import { useRouter } from "next/router";
import BlockDetail from "./BlockDetail";

const BlockPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <BlockDetail block={{ id }} />;
};

export default BlockPage;
