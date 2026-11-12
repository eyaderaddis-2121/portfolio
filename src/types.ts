export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string;
  github_link: string;
  live_link: string;
  image_url: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar_url: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
