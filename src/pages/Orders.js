import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import styles from "./Orders.module.css";
import { getOrders, updateOrderStatus } from "../services/orderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders on page load
  useEffect(() => {
    const fetchData = async () => {
      const data = await getOrders();
      setOrders(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    await updateOrderStatus(id, newStatus);
    const updated = await getOrders();
    setOrders(updated);
  };

  return (
    <>
      <Sidebar />
      <div className={styles.container}>
        <h2>Manage Orders</h2>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul className={styles.orderList}>
            {orders.map((order) => (
              <li key={order.id} className={styles.orderItem}>
                <div>
                  <strong>Order ID:</strong> {order.id} <br />
                  <strong>User:</strong> {order.user} <br />
                  <strong>Address:</strong> {order.address} <br />
                  <strong>Items:</strong>
                  <ul className={styles.itemsList}>
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.name} × {item.qty}
                      </li>
                    ))}
                  </ul>
                  <strong>Total:</strong> ₹{order.total} <br />
                  <strong>Status:</strong>{" "}
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className={styles.select}
                  >
                    <option>Pending</option>
                    <option>Preparing</option>
                    <option>Out for Delivery</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Orders;
