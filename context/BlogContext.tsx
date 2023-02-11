import { createContext, useState, useContext } from "react";

type Props = {
  children: React.ReactNode;
};

type Name = {
  label: string;
  slug: string;
};

type BlogContextValue = {
  blogNames: Name[];
  saveNames: (data: Name[]) => void;
};

const BlogContext = createContext<BlogContextValue>({
  blogNames: [],
  saveNames: () => {},
});

export function useBlogContext() {
  return useContext(BlogContext);
}

export function BlogContextProvider({ children }: Props) {
  const [blogNames, setBlogNames] = useState<Name[]>([]);

  const saveNames = (data: Name[]) => {
    setBlogNames(data);
  };

  return (
    <BlogContext.Provider value={{ blogNames, saveNames }}>
      {children}
    </BlogContext.Provider>
  );
}
