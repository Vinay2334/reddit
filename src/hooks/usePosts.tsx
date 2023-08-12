import { Post, postState } from '@/atoms/postAtom';
import { firestore, storage } from '@/firebase/clientApp';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React from 'react';
import { useRecoilState } from 'recoil';

const usePosts = () => {
    const [postStateValue, setPostStateValue] = useRecoilState(postState);
    const onVote = async() => {};
    const onSelectPost = () => {};
    const onDeletePost = async (post: Post): Promise<boolean> => {
        try {
            //Check if Image, delte if exist
            if (post.imageURL) {
                const imageRef = ref(storage, `posts/${post.id}/image`);
                await deleteObject(imageRef);
            }
            //Delete post document from firestore
            const postDocRef = doc(firestore, 'posts', post.id!);
            await deleteDoc(postDocRef);
            //update recoil state
            setPostStateValue(prev => ({
                ...prev,
                posts: prev.posts.filter(item => item.id != post.id)
            }))
            return true;
        } catch (error) {
            return false;
        }
    };
    return {
        postStateValue,
        setPostStateValue,
        onVote,
        onSelectPost,
        onDeletePost
    }
}
export default usePosts;