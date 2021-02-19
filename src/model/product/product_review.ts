import { find, query, transaction, select } from '../queryTool';
import { ERROR } from '../ERROR';

export interface ProductReview{
    reviewId: string,
    customerId: string,
    productId: string,
    rating: string,
    description:string
}

export class ProductReviewModel{
    static tableName = 'product_review';

    static async viewProductReview(){
        const [error,data]= await select(this.tableName,['review_id','customer_id','product_id','rating','description']);
        return [error as ERROR,data];
    }

    static async addProductReview(productReviewData :ProductReview){
        const query = `INSERT INTO ${this.tableName}(review_id,customer_id,product_id,rating,description) VALUES ($1,$2,$3,$4,$5)`;
        const args= [productReviewData.reviewId,
                      productReviewData.customerId,
                      productReviewData.productId,
                      productReviewData.rating,
                      productReviewData.description];

        const error = await transaction([query],[args]);
        return error;
    }

    static async findByProductReviewById(reviewId: string): Promise<[ERROR, ProductReview[]]> {
        const [error, data] = await find(this.tableName, [], 'review_id', reviewId);
        return [error as ERROR, data as ProductReview[]];
    }
}
