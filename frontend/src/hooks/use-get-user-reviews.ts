import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useToast } from 'src/components/ui/use-toast';
import { serverApi } from 'src/config/server';
import { GetUserReviewsInput, Review } from 'src/domain/reviews';

async function getUserReviews(input: GetUserReviewsInput) {
	return (await serverApi.get<Review[]>('review', { params: input })).data;
}

export function useGetUserReviews(input: GetUserReviewsInput) {
	const { toast } = useToast();

	const query = useQuery<
		Review[],
		AxiosError<{ detail?: string }>,
		Review[],
		['getUserReviews', GetUserReviewsInput]
	>(['getUserReviews', input], ({ queryKey }) => getUserReviews(queryKey[1]), {
		onError: (e) => {
			toast({
				title: 'Ops.. Error on getting reviews.',
				description: e.response?.data?.detail,
				variant: 'destructive',
			});
		},
	});

	return query;
}
