"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2 } from "lucide-react";
import SlidePanel from "@/components/admin/SlidePanel";
import ConfirmModal from "@/components/admin/ConfirmModal";
import TeamForm from "@/components/admin/TeamForm";
import { useToast } from "@/components/admin/Toast";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  bio?: string;
  avatarUrl?: string;
  skills: string[];
  linkedinUrl?: string;
  twitterUrl?: string;
}

export default function TeamPage() {
  const { toast } = useToast();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [panelOpen, setPanelOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<TeamMember | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchMembers = useCallback(async () => {
    try {
      const res = await fetch("/api/team");
      if (res.ok) setMembers(await res.json());
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  function openCreate() {
    setEditingMember(null);
    setPanelOpen(true);
  }

  function openEdit(member: TeamMember) {
    setEditingMember(member);
    setPanelOpen(true);
  }

  async function handleSave(data: Record<string, unknown>) {
    setIsSaving(true);
    try {
      const isEdit = !!editingMember;
      const url = isEdit ? `/api/team/${editingMember._id}` : "/api/team";
      const res = await fetch(url, {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast({
          type: "success",
          message: isEdit ? "Member updated!" : "Member added!",
        });
        setPanelOpen(false);
        fetchMembers();
      } else {
        const err = await res.json();
        toast({ type: "error", message: err.error || "Failed to save" });
      }
    } catch {
      toast({ type: "error", message: "Something went wrong" });
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirmDelete) return;
    try {
      const res = await fetch(`/api/team/${confirmDelete._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast({ type: "success", message: "Member removed" });
        fetchMembers();
      }
    } catch {
      toast({ type: "error", message: "Failed to remove" });
    }
    setConfirmDelete(null);
  }

  function getInitials(name: string) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-[#F0F0F8]">
            Team
          </h1>
          <p className="text-[#9CA3AF] text-sm mt-1">Manage team members</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#7C3AED] text-white text-sm font-medium hover:bg-[#6D28D9] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-2 border-[#7C3AED] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : members.length === 0 ? (
        <div className="glass rounded-xl text-center py-16 text-[#6B7280] text-sm">
          No team members yet. Click &quot;Add Member&quot; to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member) => (
            <div key={member._id} className="glass rounded-xl p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {member.avatarUrl ? (
                    <Image
                      src={member.avatarUrl}
                      alt={member.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#7C3AED]/20 flex items-center justify-center text-sm font-medium text-[#A855F7]">
                      {getInitials(member.name)}
                    </div>
                  )}
                  <div>
                    <h3 className="text-[#F0F0F8] font-medium text-sm">
                      {member.name}
                    </h3>
                    <p className="text-[#6B7280] text-xs">{member.role}</p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => openEdit(member)}
                    className="text-[#9CA3AF] hover:text-[#F0F0F8] transition-colors p-1"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setConfirmDelete(member)}
                    className="text-[#9CA3AF] hover:text-red-400 transition-colors p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              {member.skills.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {member.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-full text-[10px] bg-white/5 text-[#9CA3AF] border border-[rgba(255,255,255,0.08)]"
                    >
                      {skill}
                    </span>
                  ))}
                  {member.skills.length > 3 && (
                    <span className="text-[10px] text-[#6B7280] px-1 py-0.5">
                      +{member.skills.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <SlidePanel
        isOpen={panelOpen}
        title={editingMember ? "Edit Member" : "New Member"}
        onClose={() => setPanelOpen(false)}
        onSave={() =>
          (window as unknown as Record<string, () => void>).__teamFormSave?.()
        }
        isSaving={isSaving}
      >
        <TeamForm
          member={editingMember as never}
          onSave={handleSave as never}
          isSaving={isSaving}
        />
      </SlidePanel>

      <ConfirmModal
        isOpen={!!confirmDelete}
        title="Remove Member"
        message={`Are you sure you want to remove "${confirmDelete?.name}"?`}
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(null)}
      />
    </div>
  );
}
