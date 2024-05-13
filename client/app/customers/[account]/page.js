"use client";
import graphQLFetch from "@/app/api/graphQLFetch";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
export default function Customer({ params }) {
  const [user, setuser] = useState({});
  useEffect(() => {
    getCustomer(params);
  }, []);
  const handleTransfer = () => {
    TransferFunds();
  };
  const getCustomer = (params) => {
    const query = `query GetCustomer($accountNumber: String!) {
      getCustomer(account_number: $accountNumber) {
        account_number
        account_balance
        birthdate
        created_on
        email
        name
      }
    }`;
    const variables = { accountNumber: params.account };
    const res = graphQLFetch(query, variables).then((data) => {
      console.log(data);
      setuser(data.getCustomer);
    });
  };
  const TransferFunds = () => {
    const transfer_form = document.getElementById("transfer");
    const acc = transfer_form.acc.value;
    const amt = transfer_form.amt.value;
    const query = `mutation Mutation($transferDetails: TransferInputs!) {
      transferFunds(transferDetails: $transferDetails) {
        amount
        from_account
        status
        timestamp
        to_account
      }
    }`;
    const transfer = {
      from_account: params.account,
      to_account: acc,
      amount: parseFloat(amt),
    };
    const variables = { transferDetails: transfer };
    const res = graphQLFetch(query, variables);
  };

  return (
    <div className={styles.card}>
      <div className={styles.card_content}>
        <h3 className={styles.card_title}>Customer {params.account} Details</h3>
        <div className={styles.card_info}>
          <p>Name: {user ? user.name : "user"}</p>
          <p>Email: {user.email}</p>
          <p>Birthdate: {new Date(user.birthdate).toLocaleDateString()}</p>
          <p>Account Balance: {user.account_balance}</p>
          <p>Account Number: {user.account_number}</p>
          <p>Created On: {new Date(user.created_on).toLocaleString()}</p>
          <div>
            <form className={styles.transfer_form} id="transfer">
              <input type="text" placeholder="Account Number" name="acc" />
              <input type="numeric" placeholder="Transfer Amount" name="amt" />
            </form>
            <br />
            <button className={styles.card_link} type="button" onClick={handleTransfer}>
              Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
