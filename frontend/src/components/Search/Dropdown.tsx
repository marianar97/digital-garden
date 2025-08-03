import { useState, useRef, useEffect } from "react";

interface MenuItem {
  id: string;
  text: string;
  type: string;
  href?: string;
}

interface DropdownProps {
  onTypeChange: (type: string) => void;
  initialSelected: string | null;
}

export default function Dropdown({ onTypeChange, initialSelected = null }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(initialSelected);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Define menu items array
  const menuItems: MenuItem[] = [
    { id: "all", text: "All", type: "all" },
    { id: "video", text: "Video", type: "video" },
    { id: "article", text: "Article", type: "article" },
    { id: "book", text: "Book", type: "book" },
    { id: "tool", text: "Tool", type: "tool" },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (id: string) => {
    setSelected(id);
    if (onTypeChange) {
      onTypeChange(id);
    }
    setIsOpen(false);
  };

  // Find the text of the currently selected item
  const selectedItemText =
    menuItems.find((item) => item.id === selected)?.text || "All";

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full md:w-fit inline-block z-50" ref={dropdownRef}>
      <button
        id="menu-button"
        type="button"
        aria-expanded={isOpen ? "true" : "false"}
        aria-haspopup="true"
        onClick={toggleDropdown}
        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-900 border-2 border-gray-100 hover:border-gray-400 w-fit flex-none"
      >
        {selectedItemText}
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          data-slot="icon"
          aria-hidden="true"
          className="-mr-1 size-5 text-gray-400"
        >
          <path
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
            fillRule="evenodd"
          />
        </svg>
      </button>
      <div
        role="menu"
        tabIndex={-1}
        aria-labelledby="menu-button"
        aria-orientation="vertical"
        className={`absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden transition-all duration-200 ease-in-out transform ${isOpen
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none"
          }`}
      >
        <div role="none" className="py-1">
          {/* Active: "bg-gray-100 text-gray-900 outline-hidden", Not Active: "text-gray-700" */}
          {menuItems.map((item) =>
            item.type === "link" ? (
              <a
                key={item.id}
                id={item.id}
                role="menuitem"
                href={item.href}
                tabIndex={-1}
                onClick={(e) => {
                  e.preventDefault();
                  handleItemClick(item.id);
                }}
                className={`block px-4 py-2 text-sm ${item.id === selected
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-700"
                  } hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150`}
              >
                {item.text}
              </a>
            ) : (
              <form
                key={item.id}
                role="none"
                action="#"
                method="POST"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleItemClick(item.id);
                }}
              >
                <button
                  id={item.id}
                  type="submit"
                  role="menuitem"
                  tabIndex={-1}
                  className={`block w-full px-4 py-2 text-left text-sm ${item.id === selected
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700"
                    } hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150`}
                >
                  {item.text}
                </button>
              </form>
            )
          )}
        </div>
      </div>
    </div>
  );
}
