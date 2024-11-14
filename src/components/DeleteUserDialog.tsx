import { useUsers } from "@/conetexts/UsersContext";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "@/apis/usersApi";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Props {
  userId: number;
  userName: string;
}

export default function DeleteUserDialog({ userId, userName }: Props) {
  const [isOpen, setOpen] = useState(false);
  const { toast } = useToast();
  const { refetch } = useUsers();
  const { mutate } = useMutation({
    mutationFn: () => deleteUser(userId),
    onSuccess: () => {
      refetch();
      setOpen(false);

      showSuccessToast();
    },
    onError: showErrorToast,
  });

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete {userName}</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete that user
            from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => mutate()}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  function showSuccessToast() {
    toast({
      duration: 2000,
      description: "User deleted successfully.",
      style: { color: "green" },
    });
  }

  function showErrorToast() {
    toast({
      duration: 2000,
      description: "The user could not be deleted! Please try again.",
      style: { color: "red" },
    });
  }
}
