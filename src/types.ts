export type ActiveTab = 'accueil' | 'about' | 'contact' | 'faq';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  iconName: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  rating: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
}
