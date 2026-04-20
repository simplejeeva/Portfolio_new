import { personalInfo } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-glass-border">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} {personalInfo.name}. Built with Next.js & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
