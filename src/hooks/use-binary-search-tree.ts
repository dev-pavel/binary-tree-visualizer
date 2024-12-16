import {useCallback, useEffect, useMemo, useState} from "react";

interface TreeNode {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;
}

interface ParsedTreeNode {
    name: string;
    children: ParsedTreeNode[];
}

export const useBinarySearchTree = () => {
    const [tree, setTree] = useState<TreeNode | null>(null);
    const [parsedTree, setParsedTree] = useState<ParsedTreeNode | null>(null);

    const insert = useCallback((value: number) => {
        const newNode = {value, left: null, right: null};

        if(tree === null) {
            setTree(newNode);
            return;
        }

        let current = tree;
        while(true) {
            if(value <= current.value) {
                if(current.left === null) {
                    current.left = newNode;
                    break;
                }
                current = current.left;
            } else {
                if(current.right === null) {
                    current.right = newNode;
                    break;
                }
                current = current.right;
            }
        }
        setTree({...tree});
    }, [tree])

    const clear =  useCallback(() => {
        setTree(null);
    }, [])



    useEffect(() => {
        if(tree === null) {
            setParsedTree(null)
        }

        const parseTree = (node: TreeNode): ParsedTreeNode => {
            return {
                name: node.value.toString(),
                children: [
                    node.left ? parseTree(node.left) : {name: 'Free Slot', children: []},
                    node.right ? parseTree(node.right) : {name: 'Free Slot', children: []},
                ]
            }
        }

        if(tree) {
            setParsedTree(JSON.parse(JSON.stringify(parseTree(tree))))
        }
    }, [tree]);

    return useMemo(() => ({tree, parsedTree, insert, clear, setTree}), [tree, parsedTree, insert, clear, setTree]);
}