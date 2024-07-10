import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useToast } from 'src/components/ui/use-toast';
import { serverApi } from 'src/config/server';
import { GetInstitutionsInput, Institution } from 'src/domain/institutions';

async function getInstitutions(input?: GetInstitutionsInput) {
	return (await serverApi.get<Institution[]>('institution', { params: input })).data;
}

export function useGetInstitutions([key, input]: ['getInstitutions', GetInstitutionsInput | undefined]) {
	const { toast } = useToast();

	const query = useQuery<
		Institution[],
		AxiosError<{ detail?: string }>,
		Institution[],
		['getInstitutions', GetInstitutionsInput | undefined]
	>([key, input], ({ queryKey }) => getInstitutions(queryKey[1]), {
		onError: (e) => {
			toast({
				title: 'Ops.. Error on getting institutions',
				description: e.response?.data?.detail,
				variant: 'destructive',
			});
		},
	});

	return query;
}
