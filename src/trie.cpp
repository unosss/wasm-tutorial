#include <iostream>
#include <string>
#include <vector>

using namespace std;

typedef struct Node Node;

struct Node {
    char c; //ノードが持つ文字
    vector<Node*> children;
};

class Trie {

public:

    Node root;

    Trie() {
        // コンストラクタ
        // cout << "Make Trie." << endl;
        return ;
    }

    void insert(string str) { // 文字列 str を登録する
        Node *ptr = &root; // 現在のノード
        int pos = 0; // 文字列 str 上の位置
        while (pos < str.size()) {
            bool isExistsChild = false;
            for (int i = 0;i < (ptr->children).size(); i++) {
                if (ptr->children[i]->c == str[pos]) {
                    isExistsChild = true;
                    ptr = ptr->children[i];
                    break;
                }
            }
            if (!isExistsChild) {
                Node *child_ptr = (Node*)calloc(1,sizeof(Node));
                child_ptr->c = str[pos];
                ptr->children.push_back(child_ptr);
                ptr = ptr->children.back();
            }
            pos++;
        }
        return ;
    }

    bool isExists(string str) { // Trie に str に前方一致する文字列が登録されているかどうかを判定する
        Node *ptr = &root; // 現在のノード
        int pos = 0; // 文字列 str 上の位置
        while (pos < str.size()) {
            bool isExistsChild = false;
            for (int i = 0;i < (ptr->children).size(); i++) {
                if (ptr->children[i]->c == str[pos]) {
                    isExistsChild = true;
                    ptr = ptr->children[i];
                    pos++;
                    break;
                }
            }
            if (!isExistsChild) {
                return false;
            }
        }
        return true;
    }
};

extern "C" {
    Trie create_trie() {
        return new Trie();
    }

    void insert(Trie *trie, string str) {
        trie->insert(str);
        return;
    }

    bool isExists(Trie *trie, string str) {
        return trie->isExists(str);
    }
}