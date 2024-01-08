"use client";

import { useSettings } from "@/hooks/Settings";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ThemeToggler } from "../ThemeToggler";

const SettingsModel = () => {
  const [isMounted, setIsMounted] = useState(false);

  const settings = useSettings();

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-lg font-medium">My settings</h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <label>Appearance</label>
            <span className="text-sm text-muted-foreground">
              Customize how Jotion looks on your device
            </span>
          </div>
          <ThemeToggler />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModel;
