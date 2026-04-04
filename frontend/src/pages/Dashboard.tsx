import {useState, useEffect} from "react";
import api from "../services/api";

interface Category {
  _id: string;
  displayName: string;
}

function Dashboard() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [links, setLinks] = useState<any[]>([]);
  const [newLink, setNewLink] = useState("");

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      const response = await api.post("/categories", { displayName: newCategory });
      if (response.data.success) {
        // Add new category to state to update UI instantly
        setCategories([...categories, response.data.data]);
        setNewCategory(""); // clear input
      } else {
        alert(response.data.message);
      }
    } catch (error: any) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to add category");
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const response = await api.delete(`/categories/${id}`);

      if (response.data.success) {
        // remove from UI
        setCategories(categories.filter((cat) => cat._id !== id));
      } else {
        alert(response.data.message);
      }
    } catch (error: any) {
      console.log(error);
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  const handleDeleteLink = async (id: string) => {
    try {
      const response = await api.delete(`/links/${id}`);

      if (response.data.success) {
        setLinks(links.filter((link) => link._id !== id));
      } else {
        alert(response.data.message);
      }
    } catch (error: any) {
      console.log(error);
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  const handleAddLink = async () => {
    if (!newLink.trim()) {
      alert("URL required");
      return;
    }

    try {
      const response = await api.post("/links", {
        categoryId: selectedCategory,
        name: newLink,            // temporary
        originalURL: newLink,     // correct field
      });

      if (response.data.success) {
        setLinks([...links, response.data.data]);
        setNewLink("");
      } else {
        alert(response.data.message);
      }
    } catch (error: any) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to add link");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        if (response.data.success) {
          setCategories(response.data.data);
        } else {
          alert(response.data.message);
        }
      } catch (error: any) {
        console.log(error);
        alert(error.response?.data?.message || "Failed to fetch categories");
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;

    const fetchLinks = async () => {
      try {
        const response = await api.get(`/links/${selectedCategory}`);

        if (response.data.success) {
          setLinks(response.data.data);
        } else {
          alert(response.data.message);
        }
      } catch (error: any) {
        console.log(error);
        alert(error.response?.data?.message || "Failed to fetch links");
      }
    };

    fetchLinks();
  }, [selectedCategory]);

  return (
    <div className="h-screen flex flex-col">
      
      {/* Header */}
      <nav className="flex items-center justify-between bg-blue-500 text-white border-b border-slate-200 px-6 py-4 shadow-sm">
        {/* Logo / Brand Section */}
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">
            <span className="text-white">LinkNest &nbsp;Dashboard</span>
          </h1>
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-md transition-colors duration-200"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </nav>

      {/* Body */}
      <div className="flex flex-1">
        
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-100 p-4">
          <h2 className="font-semibold mb-2">Categories</h2>

          <div className="mb-4">
            <input
              type="text"
              placeholder="New category"
              className="border p-1 rounded w-full"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white mt-2 px-2 py-1 rounded w-full hover:bg-blue-600"
              onClick={handleAddCategory}
            >
              Add
            </button>
          </div>

          {categories.length === 0 ? (
            <p className="text-sm text-gray-500">No categories yet</p>
          ) : (
            <ul>
              {categories.map((cat) => (
                <div
                  key={cat._id}
                  className={`flex justify-between items-center p-1 cursor-pointer ${
                    selectedCategory === cat._id ? "bg-gray-300" : "hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedCategory(cat._id)}
                >
                  <span>{cat.displayName}</span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // prevent click conflict
                      handleDeleteCategory(cat._id);
                    }}
                    className="text-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </ul>
          )}

          <div className="flex-1 p-4">
            <h2 className="font-semibold">Links</h2>

            {selectedCategory ? (
              <p className="text-sm text-gray-500">
                Showing links for selected category
              </p>
            ) : (
              <p className="text-sm text-gray-500">
                Select a category
              </p>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
          <h2 className="font-semibold mb-2">Links</h2>

          {!selectedCategory ? (
            <p className="text-sm text-gray-500">Select a category</p>
          ) : links.length === 0 ? (
            <p className="text-sm text-gray-500">No links yet</p>
          ) : (
            <ul>
              {links.map((link) => (
                <div
                  key={link._id}
                  className="flex justify-between items-center p-2 border rounded mb-2"
                >
                  <div>
                    <p className="text-sm text-gray-500">
                      Short: 
                      <a
                        href={`http://localhost:5000/${link.shortCode}`}
                        target="_blank"
                        className="text-blue-500 ml-1"
                      >
                        {link.shortCode}
                      </a>
                    </p>
                    <p className="text-xs text-gray-400"> Clicks: {link.clickCount} </p>
                    <button
                      onClick={() => navigator.clipboard.writeText(`http://localhost:5000/${link.shortCode}`)}
                      className="text-xs text-blue-500 ml-2"
                    >
                      Copy
                    </button>
                  </div>

                  <button
                    onClick={() => handleDeleteLink(link._id)}
                    className="text-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </ul>
          )}

          {selectedCategory && (
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter URL"
                className="border p-2 rounded w-full mb-2"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
              />

              <button
                onClick={handleAddLink}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Add Link
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;