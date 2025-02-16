import React from "react";
import Link from "next/link"; // Use Next.js Link

const CustomerPage = () => {
  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <h1 style={styles.logo}>Vehicle Service Management</h1>
        <div>
          <a href="/home" style={styles.navLink}>Home</a>
          <a href="#" style={styles.navLink}>Customer</a>

          <a href="/login" style={styles.navLink}>Admin</a>
        </div>
      </nav>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <h1 style={styles.greeting}><span style={styles.highlight}>Hello,</span> Customer</h1>
        <p style={styles.subtext}>Welcome to Vehicle Service Management</p>
        <p style={styles.description}>You can access various features after Login.</p>
        
        <div style={styles.buttonContainer}>
            <Link href="/create">
          <button style={styles.primaryButton}>Create Your Account</button>
          </Link>
          <Link href="/customerlogin">
            <button style={styles.secondaryButton}>Login</button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2025 Vehicle Service Management</p>
      </footer>
    </div>
  );
};

// CSS in JS
const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
  },
  navbar: {
    backgroundColor: "#3f51b5",
    color: "white",
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "yellow",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    margin: "0 10px",
    fontSize: "16px",
  },
  mainContent: {
    marginTop: "50px",
    textAlign: "center",
  },
  greeting: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#333",
  },
  highlight: {
    color: "#2979ff",
    backgroundColor: "#cce5ff",
    padding: "5px",
    borderRadius: "5px",
  },
  subtext: {
    fontSize: "18px",
    color: "#666",
  },
  description: {
    fontSize: "16px",
    color: "#666",
    marginTop: "10px",
  },
  buttonContainer: {
    marginTop: "20px",
  },
  primaryButton: {
    backgroundColor: "#2979ff",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    marginRight: "10px",
    cursor: "pointer",
  },
  secondaryButton: {
    backgroundColor: "#0057e7",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  footer: {
    marginTop: "50px",
    padding: "10px",
    backgroundColor: "#3f51b5",
    color: "white",
    position: "fixed",
    width: "100%",
    bottom: "0",
  },
};

export default CustomerPage;
