import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query'
import { Button } from "@/components/ui/button"

type Props = {
    hasNextPage: boolean | undefined,
    isFetchingNextPage: boolean,
    fetchNextPage: (options?: FetchNextPageOptions) => Promise<InfiniteQueryObserverResult<InfiniteData<any, unknown>, Error>>

}

export const ChooseImageLoadMoreBtn = ({

    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
}: Props) => {


    if (hasNextPage !== undefined && hasNextPage) {
        return (
            <Button
                type="button"
                variant={"outline"}
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                size={"lg"}
                className="border-primary text-primary w-40"
            >
                {isFetchingNextPage
                    ? "Loading more..."
                    : hasNextPage
                        ? "Load More"
                        : "No more images"}
            </Button>
        )
    }
    return null

}