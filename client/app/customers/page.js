"use client";
import { useEffect, useState } from "react";
import graphQLFetch from "../api/graphqlFetch";
import Link from "next/link";
import styles from "./page.module.css";
export default function Customers() {
  const [customers, setCustomers] = useState(null);
  const getAllCustomers = async () => {
    const query = `query GetAllCustomers {
      getAllCustomers {
        account_balance
        account_number
        birthdate
        created_on
        email
        name
      }
    }`;
    const customers = await graphQLFetch(query);
    if (customers) setCustomers(customers);
    console.log("Customers:", customers);
    return customers;
  };
  useEffect(() => {
    getAllCustomers();
  }, []);
  return (
    <div>
      {customers
        ? customers.getAllCustomers.map((c) => (
            <div className={styles.card}>
              <div className={styles.card_content}>
                <h3 className={styles.card_title}>Customer Information</h3>
                <div className={styles.card_info}>
                  <div key={c.account_number}>
                    <p>
                      <span className={styles.label}>Name:</span> {c.name}
                    </p>
                    <p>
                      <span className={styles.label}>Email:</span> {c.email}
                    </p>
                    <p>
                      <span className={styles.label}>Account Number:</span>{" "}
                      {c.account_number}
                    </p>
                    <p>
                      <span className={styles.label}>Account Balance:</span>{" "}
                      {c.account_balance}
                    </p>
                    <p>
                      <span class="label">Account Created On:</span>
                      {c.created_on.toString()}
                    </p>
                    <Link
                      href="/customers/[account]"
                      as={`/customers/${c.account_number}`}
                      legacyBehavior
                    >
                      <a
                        className={styles.card_link}
                      >{`Go to ${c.name}'s Account`}</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        : "customers"}
    </div>
  );
}
