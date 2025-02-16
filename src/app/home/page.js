import React from "react";
import Link from "next/link"; // Use Next.js Link

const HomePage = () => {
  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <h1>Vehicle Service Management</h1>
        <div>
          <Link href="/home" style={styles.navLink}>Home</Link>
          <Link href="/customer" style={styles.navLink}>Customer</Link>
          <Link href="/login" style={styles.navLink}>Admin</Link>
          <Link href="/about" style={styles.navLink}>About Us</Link>
          <Link href="/contact" style={styles.navLink}>Contact Us</Link>
        </div>
      </nav>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Customer Card */}
        <div>
          <img src="/image3.png" alt="Customer" style={{ width:'736px', height: '500px' }} />
        
        </div>
      </div>
    </div>
  );
};

// CSS in JS Styles
const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
    padding: "20px",
  },
  navbar: {
    backgroundColor: "#3f51b5",
    color: "white",
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    margin: "0 10px",
  },
  mainContent: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "50px",
  },
  card: {
    backgroundColor: "white",
    width: "250px",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  cardImg: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  viewBtn: {
    backgroundColor: "black",
    color: "white",
    padding: "10px",
    width: "100%",
    border: "none",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default HomePage;
