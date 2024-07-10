import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactElement, ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import debounce from 'debounce';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useCreateReview } from 'src/hooks/use-create-review';
import { useGetInstitutions } from 'src/hooks/use-get-institutions';
import { cn } from 'src/lib/utils';
import { useAuth } from 'src/providers/auth';
import { z } from 'zod';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Ratings } from '../ui/ratings';
import { Textarea } from '../ui/textarea';

const createReviewFormSchema = z
	.object({
		title: z.string().trim().min(1, { message: 'Title is required' }),
		content: z.string().trim().min(1, { message: 'Content is required' }),
		rating: z.number().min(0.1, { message: 'Rating is required' }).max(10),
		institution: z.object({
			institution_id: z.number().min(1, { message: 'Institution is required' }),
			name: z.string().optional(),
			abbrev: z.string().optional(),
			code: z.number().optional(),
		}),
		private: z.boolean().default(false),
	})
	.passthrough();

export function CreateReviewDialog({
	children,
	actionOnSubmit,
	open,
}: {
	children: ReactNode;
	actionOnSubmit?: () => void;
	open: boolean;
}): ReactElement {
	const [institutionsSearch, setInstitutionsSearch] = useState<string>('');
	const createReviewForm = useForm<z.infer<typeof createReviewFormSchema>>({
		resolver: zodResolver(createReviewFormSchema),
		defaultValues: {
			title: '',
			content: '',
			rating: 0,
			institution: undefined,
			private: false,
		},
	});
	const { data: institutions } = useGetInstitutions([
		'getInstitutions',
		{ name_or_abbrev: institutionsSearch, limit: 100 },
	]);
	const debouncedSetInstitutionsSearch = debounce(setInstitutionsSearch, 300);
	const { mutate: createReviewMutation } = useCreateReview();
	const { decodedToken } = useAuth();

	const onSubmit = (values: z.infer<typeof createReviewFormSchema>) => {
		if (!decodedToken?.user_id) throw new Error('User not found');
		createReviewMutation({
			...values,
			institution_id: values.institution.institution_id,
			user_id: decodedToken?.user_id,
		});
		actionOnSubmit?.();
	};

	return (
		<Dialog open={open}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="">
				<DialogHeader>
					<DialogTitle>Create a review</DialogTitle>
					<DialogDescription>Write your review here. Click create when you&apos;re done.</DialogDescription>
				</DialogHeader>
				<Form {...createReviewForm}>
					<form onSubmit={createReviewForm.handleSubmit(onSubmit)}>
						<div className="grid gap-4 py-4">
							<FormField
								control={createReviewForm.control}
								name="title"
								render={({ field }) => (
									<FormItem className="grid gap-2">
										<FormLabel>Title</FormLabel>
										<FormControl>
											<Input className="max-w-full" placeholder="Title..." {...field} />
										</FormControl>
										<FormMessage className="text-sm" />
									</FormItem>
								)}
							/>
							<FormField
								control={createReviewForm.control}
								name="rating"
								render={({ field }) => (
									<FormItem className="grid gap-2">
										<FormLabel>Rating</FormLabel>
										<FormControl>
											<Ratings
												asInput
												{...field}
												value={field.value}
												onValueChange={(value) => createReviewForm.setValue('rating', value)}
												totalStars={5}
											/>
										</FormControl>
										<FormMessage className="text-sm" />
									</FormItem>
								)}
							/>
							<FormField
								control={createReviewForm.control}
								name="content"
								render={({ field }) => (
									<FormItem className="grid gap-2">
										<FormLabel>Content</FormLabel>
										<FormControl>
											<Textarea placeholder="More details here..." {...field} />
										</FormControl>
										<FormMessage className="text-sm" />
									</FormItem>
								)}
							/>
							<FormField
								control={createReviewForm.control}
								name="institution"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel>Institution</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant="outline"
														role="combobox"
														className={cn(
															'w-full justify-between',
															!field.value && 'text-muted-foreground',
														)}
													>
														{field.value
															? institutions?.find(
																	(institution) =>
																		institution.institution_id ===
																			field?.value?.institution_id ||
																		field?.value?.name === institution.name ||
																		field?.value?.abbrev === institution.abbrev ||
																		field?.value?.code === institution.code,
															  )?.name
															: 'Select institution'}
														<ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-full p-0">
												<Command>
													<CommandInput
														placeholder="Search institution..."
														onValueChange={(value) => debouncedSetInstitutionsSearch(value)}
													/>
													<CommandEmpty>No institution found.</CommandEmpty>
													<CommandGroup>
														<CommandList>
															{institutions?.map((institution) => (
																<CommandItem
																	className="cursor-pointer"
																	value={institution.name}
																	key={institution.institution_id}
																	onSelect={() => {
																		createReviewForm.setValue(
																			'institution',
																			institution,
																		);
																	}}
																>
																	<Check
																		className={cn(
																			'mr-2 h-4 w-4',
																			institution.institution_id ===
																				field?.value?.institution_id
																				? 'opacity-100'
																				: 'opacity-0',
																		)}
																	/>
																	{institution.name}
																</CommandItem>
															))}
														</CommandList>
													</CommandGroup>
												</Command>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<DialogFooter>
							<DialogClose asChild>
								<Button onClick={createReviewForm.handleSubmit(onSubmit)} type="submit">
									Create
								</Button>
							</DialogClose>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
