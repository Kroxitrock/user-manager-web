import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { SaveUserDto, UserDetails } from "@/dtos/userDtos";
import { useMutation } from "@tanstack/react-query";
import { createUser, updateUser } from "@/apis/usersApi";
import { useUsers } from "@/conetexts/UsersContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(1, "Name is required!"),
  email: z
    .string()
    .email("The email should be in the correct format!")
    .min(1, "Email is required!"),
  phoneNumber: z.coerce
    .string()
    .regex(
      RegExp("^\\+?[0-9]+$"),
      'A phone number can only contain digits and may start with a "+" sign.'
    )
    .min(1, "Phone number is required!"),
});

interface Props {
  user?: UserDetails;
}

export function UserDetailsDialog({ user }: Props) {
  const [isOpen, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: user
      ? { name: user.name, email: user.email, phoneNumber: user.phoneNumber }
      : {},
  });
  const { toast } = useToast();
  const { refetch } = useUsers();
  const { mutate: update } = useMutation({
    mutationFn: (userDto: SaveUserDto) => updateUser(user!.id, userDto),
    onSuccess: () => {
      setOpen(false);
      refetch();

      showSuccessToast("User eddited successfully.");
    },
    onError: () => showErrorToast("Error edditing user! Please try again."),
  });

  const { mutate: create } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      setOpen(false);
      refetch();
      form.reset();
      showSuccessToast("User created successfully.");
    },
    onError: () => showErrorToast("Error creating user! Please try again."),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (user) {
      update(values);
      return;
    }

    create(values);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>{user ? "Details" : "Create"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> {user ? "User Details" : "Create Users"} </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+359888888888" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );

  function showSuccessToast(message: string) {
    toast({
      duration: 2000,
      description: message,
      style: { color: "green" },
    });
  }

  function showErrorToast(message: string) {
    toast({
      duration: 2000,
      description: message,
      style: { color: "red" },
    });
  }
}
