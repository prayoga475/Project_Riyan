// DOM Elements
const toTop = document.querySelector(".back-top");
const burger = document.querySelector(".burger");
const links = document.querySelector(".links");
const form = document.querySelector("form");

// Back to top button
window.addEventListener("scroll", () => {
    toTop.classList.toggle("active", window.scrollY > 75);
});

// Mobile menu toggle
burger.addEventListener("click", () => {
    links.classList.toggle("show");
});

// Close mobile menu when clicking links
document.querySelectorAll(".links li a").forEach(link => {
    link.addEventListener("click", () => {
        links.classList.remove("show");
    });
});

// Form handling
class FormHandler {
    constructor(formElement) {
        this.form = formElement;
        this.submitBtn = document.getElementById("submitBtn");
        this.setupEventListeners();
    }

    setupEventListeners() {
        if (this.submitBtn) {
            this.submitBtn.addEventListener("click", (e) => this.handleSubmit(e));
        }
    }

    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    validateForm(formData) {
        const { name, email, message } = formData;
        
        if (!name || !email || !message) {
            throw new Error("Please fill out all fields");
        }
        
        if (!this.validateEmail(email)) {
            throw new Error("Please enter a valid email address");
        }
        
        return true;
    }

    async sendData(formData) {
        const response = await fetch("http://localhost:3001/api/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error(`Failed to send message: ${response.statusText}`);
        }

        return response.json();
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById("name")?.value?.trim(),
            email: document.getElementById("email")?.value?.trim(),
            message: document.getElementById("message")?.value?.trim()
        };

        try {
            this.validateForm(formData);
            await this.sendData(formData);
            alert("Message sent successfully!");
            this.form.reset();
        } catch (error) {
            alert(error.message);
            console.error("Error:", error);
        }
    }
}

// Initialize form handler
if (form) {
    new FormHandler(form);
}