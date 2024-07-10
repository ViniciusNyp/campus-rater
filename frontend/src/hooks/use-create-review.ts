import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useToast } from 'src/components/ui/use-toast';
import { serverApi } from 'src/config/server';
import { CreateReviewInput, Review } from 'src/domain/reviews';

async function createReview(input: CreateReviewInput) {
	return (await serverApi.post<Review>('review', input)).data;
}

export function useCreateReview() {
	const { toast } = useToast();

	const mutation = useMutation<Review, AxiosError<{ detail?: string }>, CreateReviewInput>(createReview, {
		onError: (e) => {
			toast({
				title: 'Ops.. Error on creating review.',
				description: e.response?.data?.detail,
				variant: 'destructive',
			});
		},
	});

	return mutation;
}
