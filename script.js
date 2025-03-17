// Добавление постов в блог
const posts = [
    { title: "Мой первый пост", content: "Это текст моего первого поста.", image: "image1.jpg" },
    { title: "Второй пост", content: "Это текст второго поста.", video: "video1.mp4" }
  ];
  
  const postsContainer = document.getElementById("posts");
  
  posts.forEach(post => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      ${post.image ? `<img src="${post.image}" alt="${post.title}">` : ""}
      ${post.video ? `<iframe src="${post.video}"></iframe>` : ""}
    `;
    postsContainer.appendChild(postElement);
  });
  
  // Добавление проектов
  const projects = [
    { title: "Проект 1", description: "Описание проекта 1.", image: "project1.jpg" },
    { title: "Проект 2", description: "Описание проекта 2.", image: "project2.jpg" }
  ];
  
  const projectsContainer = document.getElementById("projects-list");
  
  projects.forEach(project => {
    const projectElement = document.createElement("div");
    projectElement.classList.add("project");
    projectElement.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      ${project.image ? `<img src="${project.image}" alt="${project.title}">` : ""}
    `;
    projectsContainer.appendChild(projectElement);
  });

// script.js
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("a");
    links.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const href = link.getAttribute("href");
        document.querySelector(".content").style.opacity = 0;
        setTimeout(() => {
          window.location.href = href;
        }, 500); // Задержка для анимации
      });
    });
  });