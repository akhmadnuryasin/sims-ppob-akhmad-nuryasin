import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HistoryAction } from "../redux/reducer/transaction";

import MiniProfile from "../components/MiniProfile";
import UserBalance from "../components/UserBalance";
import TransactionCard from "../components/TransactionCard";

export default function Transaction() {
  const [page, setPage] = useState(1);
  const { history_transaction } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(HistoryAction.getHistoryTransaction(page));
  }, [dispatch, page]);

  function handlePagination() {
    if (history_transaction.length === 5) {
      setPage(page + 1);
    } else {
      if (page > 1) {
        setPage(page - 1);
      } else {
        setPage(1);
      }
    }
  }

  return (
    <main className="py-8">
      <section className="grid grid-cols-1 grid-rows-2 gap-3 sm:grid-cols-2 sm:grid-rows-1">
        <MiniProfile />
        <UserBalance />
      </section>
      <section className="my-8">
        <h1 className="text-xl font-medium">Semua Transaksi</h1>
      </section>
      <section className="flex flex-col gap-3">
        {history_transaction.map((transaction) => (
          <TransactionCard data={transaction} />
        ))}
      </section>
      <section className="flex items-center justify-center gap-5 my-5">
        <button
          className="font-medium text-red-500"
          onClick={() => handlePagination()}
        >
          {history_transaction.length < 5 && page > 1 && "Show Less"}
          {history_transaction.length === 5 && "Show More"}
          {history_transaction.length < 5 && page === 1 && null}
        </button>
      </section>
    </main>
  );
}
