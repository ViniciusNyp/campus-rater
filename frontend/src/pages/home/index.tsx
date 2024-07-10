import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { Loader2, Plus } from 'lucide-react';
import { useState } from 'react';
import { CreateReviewDialog } from 'src/components/create-review-dialog';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'src/components/ui/card';
import { Ratings } from 'src/components/ui/ratings';
import { useGetUserReviews } from 'src/hooks/use-get-user-reviews';
import { cn } from 'src/lib/utils';
import { useAuth } from 'src/providers/auth';

export function HomePage() {
	const { decodedToken } = useAuth();
	const { data: reviews, isLoading, refetch } = useGetUserReviews({ user_id: decodedToken?.user_id });
	const [open, setOpen] = useState(false);

	return (
		<div className="grid w-full min-h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)]">
			<main className="flex flex-col flex-1 w-full gap-4 p-4 lg:gap-6 lg:p-6">
				<div className="flex items-center">
					<h1 className="text-lg font-semibold md:text-2xl">My reviews</h1>
					<CreateReviewDialog
						open={open}
						actionOnSubmit={() => {
							setOpen(false);
							setTimeout(() => refetch(), 1000);
						}}
					>
						<Button
							variant="outline"
							size="icon"
							className="w-10 h-10 ml-auto"
							onClick={() => setOpen(true)}
						>
							<Plus />
						</Button>
					</CreateReviewDialog>
				</div>
				<div className="flex flex-col items-center justify-center h-full min-h-[calc(100vh-11rem)] max-h-[calc(100vh-11rem)] p-4 border border-dashed rounded-lg shadow-sm ">
					{isLoading ? (
						<div className="flex items-center justify-center h-full">
							<Loader2 className="animate-spin" />
						</div>
					) : !reviews?.length ? (
						<div className="flex flex-col items-center gap-1 text-center">
							<h2 className="text-2xl font-bold tracking-tight">You have no reviews yet</h2>
							<p className="text-sm text-muted-foreground">Create your first review now!</p>
							<Button onClick={() => setOpen(true)} className="mt-4">
								Create review
							</Button>
						</div>
					) : (
						<ScrollArea className="w-full h-full">
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
								{reviews?.map((review) => (
									<Card
										key={review.review_id}
										className={cn(
											`${
												review.private
													? 'border border-dashed'
													: 'flex flex-col justify-between'
											}`,
										)}
									>
										<CardHeader className="gap-1">
											<CardTitle>{review.title}</CardTitle>
											<Ratings value={review.rating / 2} totalStars={5} size={16} />
										</CardHeader>
										<CardContent className="flex flex-col h-full max-h-full text-sm text-muted-foreground">
											<ScrollArea>
												<p className="break-words max-h-48">{review.content}</p>
											</ScrollArea>
										</CardContent>
										<CardFooter className="flex items-center justify-between">
											<p className="text-xs text-muted-foreground">
												{format(
													review.created_at,
													`${
														new Date(review.created_at).getFullYear() ===
															new Date().getFullYear() &&
														new Date().getMonth() === new Date(review.created_at).getMonth()
															? 'MMMM'
															: ''
													} ${
														new Date(review.created_at).getFullYear() !==
														new Date().getFullYear()
															? ', yyyy'
															: ''
													}do HH:mm`,
												)}
											</p>
											{review.updated_at !== review.created_at ? (
												<p className="text-xs text-muted-foreground">
													Last edited in:{' '}
													{format(
														review.updated_at,
														`${
															new Date(review.updated_at).getFullYear() ===
																new Date().getFullYear() &&
															new Date().getMonth() ===
																new Date(review.updated_at).getMonth()
																? 'MMMM'
																: ''
														} ${
															new Date(review.updated_at).getFullYear() !==
															new Date().getFullYear()
																? ', yyyy'
																: ''
														}do HH:mm`,
													)}
												</p>
											) : (
												<></>
											)}
										</CardFooter>
									</Card>
								))}
							</div>
						</ScrollArea>
					)}
				</div>
			</main>
		</div>
	);
}
