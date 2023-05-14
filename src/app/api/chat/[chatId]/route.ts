import { makeBadRequestError } from "@/features/utils/serverError";



export async function GET(request: Request, {params}: {params: {chatId: string}}) {

    const {chatId} = params;


    try {
        
    } catch (error) {
        return makeBadRequestError('Error getting chat messages')
    }
}