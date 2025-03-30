"use client";

import { useSlideStore } from "@/store/useSlideStore";
import { useState } from "react";

type Props = { presentationId: string };

const Navbar = ({ presentationId }: Props) => {
  const { currentTheme } = useSlideStore();
  const [isPresentationMode, setIsPresentationMode] = useState(false);

  return <div>Navbar</div>;
};

export default Navbar;
