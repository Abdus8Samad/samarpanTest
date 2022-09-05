// FCFS Disk Scheduling Algo
#include <bits/stdc++.h>
using namespace std;
int size = 8;
void FCFS(int arr[], int head)
{
    int seek_count = 0;
    int distance, cur_track;
    for (int i = 0; i < size; i++)
    {
        cur_track = arr[i];
        distance = abs(cur_track - head);
        seek_count += distance;
        head = cur_track;
    }
    cout << "Total number of seek operations = "
         << seek_count << endl;
    // Seek sequence would be the same
    // as request array sequence
    cout << "Seek Sequence is" << endl;
    for (int i = 0; i < size; i++)
    {
        cout << arr[i] << endl;
    }
}
// Driver code int main()
{
    // request array
    int arr[size] = {176, 79, 34, 60, 92, 11, 41, 114};
    int head = 50;
    FCFS(arr, head);
    return 0;
}
// SSTF Disk Scheduling Algo #include <bits/stdc++.h> using namespace std;
void calculatedifference(int request[], int head, int diff[][2], int n)
{
    for (int i = 0; i < n; i++)
    {
        diff[i][0] = abs(head - request[i]);
    }
}
int findMIN(int diff[][2], int n)
{
    int index = -1;
    int minimum = 1e9;
    for (int i = 0; i < n; i++)
    {
        if (!diff[i][1] && minimum > diff[i][0])
        {
            minimum = diff[i][0];
            index = i;
        }
    }
    return index;
}
void shortestSeekTimeFirst(int request[], int head, int n)
{
    if (n == 0)
    {
        return;
    }
    int diff[n][2] = {{0, 0}};
    int seekcount = 0;
    int seeksequence[n + 1] = {0};
    for (int i = 0; i < n; i++)
    {
        seeksequence[i] = head;
        calculatedifference(request, head, diff, n);
        int index = findMIN(diff, n);
        diff[index][1] = 1;
        seekcount += diff[index][0];
        head = request[index];
    }
    seeksequence[n] = head;
    cout << "Total number of seek operations = "
         << seekcount << endl;
    cout << "Seek sequence is : "
         << "\n";
    // Print the sequence
    for (int i = 0; i <= n; i++)
    {
        cout << seeksequence[i] << "\n";
    }
}
// Driver code int main()
{
    int n = 8;
    int proc[n] = {176, 79, 34, 60, 92, 11, 41, 114};
    shortestSeekTimeFirst(proc, 50, n);
    return 0;
}
// SCAN Disk Scheduling algorithm #include <bits/stdc++.h>
using namespace std;
int size = 8;
int disk_size = 200;
void SCAN(int arr[], int head, string direction)
{
    int seek_count = 0;
    int distance, cur_track;
    vector<int> left, right;
    vector<int> seek_sequence;
    if (direction == "left")
        left.push_back(0);
    else if (direction == "right")
        right.push_back(disk_size - 1);
    for (int i = 0; i < size; i++)
    {
        if (arr[i] < head)
            left.push_back(arr[i]);
        if (arr[i] > head)
            right.push_back(arr[i]);
    }
    std::sort(left.begin(), left.end());
    std::sort(right.begin(), right.end());
    int run = 2;
    while (run--)
    {
        if (direction == "left")
        {
            for (int i = left.size() - 1; i >= 0; i--)
            {
                cur_track = left[i];
                seek_sequence.push_back(cur_track);
                distance = abs(cur_track - head);
                seek_count += distance;
                head = cur_track;
            }
            direction = "right";
        }
        else if (direction == "right")
        {
            for (int i = 0; i < right.size(); i++)
            {
                cur_track = right[i];
                seek_sequence.push_back(cur_track);
                distance = abs(cur_track - head);
                seek_count += distance;
                head = cur_track;
            }
            direction = "left";
        }
    }
    cout << "Total number of seek operations = "
         << seek_count << endl;
    cout << "Seek Sequence is" << endl;
    for (int i = 0; i < seek_sequence.size(); i++)
    {
        cout << seek_sequence[i] << endl;
    }
}
// Driver code int main()
{
    // request array
    int arr[size] = {176, 79, 34, 60,
                     92, 11, 41, 114};
    int head = 50;
    string direction = "left";
    SCAN(arr, head, direction);
    return 0;
}
// C-SCAN Disk Scheduling Algo #include <bits/stdc++.h> using namespace std;
int size = 8;
int disk_size = 200;
void CSCAN(int arr[], int head)
{
    int seek_count = 0;
    int distance, cur_track;
    vector<int> left, right;
    vector<int> seek_sequence;
    left.push_back(0);
    right.push_back(disk_size - 1);
    for (int i = 0; i < size; i++)
    {
        if (arr[i] < head)
            left.push_back(arr[i]);
        if (arr[i] > head)
            right.push_back(arr[i]);
    }
    std::sort(left.begin(), left.end());
    std::sort(right.begin(), right.end());
    for (int i = 0; i < right.size(); i++)
    {
        cur_track = right[i];
        seek_sequence.push_back(cur_track);
        distance = abs(cur_track - head);
        seek_count += distance;
        head = cur_track;
    }
    head = 0;
    seek_count += (disk_size - 1);
    for (int i = 0; i < left.size(); i++)
    {
        cur_track = left[i];
        seek_sequence.push_back(cur_track);
        distance = abs(cur_track - head);
        seek_count += distance;
        head = cur_track;
    }
    cout << "Total number of seek operations = "
         << seek_count << endl;
    cout << "Seek Sequence is" << endl;
    for (int i = 0; i < seek_sequence.size(); i++)
    {
        cout << seek_sequence[i] << endl;
    }
}
// Driver code int main()
{
    // request array
    int arr[size] = {176, 79, 34, 60, 92, 11, 41, 114};
    int head = 50;
    cout << "Initial position of head: " << head << endl;
    CSCAN(arr, head);
    return 0;
}
// LOOK Disk Scheduling Algo int size = 8;
#include <bits/stdc++.h> using namespace std;
int disk_size = 200;
void LOOK(int arr[], int head, string direction)
{
    int seek_count = 0;
    int distance, cur_track;
    vector<int> left, right;
    vector<int> seek_sequence;
    for (int i = 0; i < size; i++)
    {
        if (arr[i] < head)
            left.push_back(arr[i]);
        if (arr[i] > head)
            right.push_back(arr[i]);
    }
    std::sort(left.begin(), left.end());
    std::sort(right.begin(), right.end());
    int run = 2;
    while (run--)
    {
        if (direction == "left")
        {
            for (int i = left.size() - 1; i >= 0; i--)
            {
                cur_track = left[i];
                seek_sequence.push_back(cur_track);
                distance = abs(cur_track - head);
                seek_count += distance;
                head = cur_track;
            }
            direction = "right";
        }
        else if (direction == "right")
        {
            for (int i = 0; i < right.size(); i++)
            {
                cur_track = right[i];
                seek_sequence.push_back(cur_track);
                distance = abs(cur_track - head);
                seek_count += distance;
                head = cur_track;
            }
            direction = "left";
        }
    }
    cout << "Total number of seek operations = "
         << seek_count << endl;
    cout << "Seek Sequence is" << endl;
    for (int i = 0; i < seek_sequence.size(); i++)
    {
        cout << seek_sequence[i] << endl;
    }
}
// Driver code int main()
{
    // request array
    int arr[size] = {176, 79, 34, 60,
                     92, 11, 41, 114};
    int head = 50;
    string direction = "right";
    cout << "Initial position of head: "
         << head << endl;
    LOOK(arr, head, direction);
    return 0;
}
// C-LOOK Algo
#include <bits/stdc++.h>
using namespace std;
int size = 8;
int disk_size = 200;
void CLOOK(int arr[], int head)
{
    int seek_count = 0;
    int distance, cur_track;
    vector<int> left, right;
    vector<int> seek_sequence;
    for (int i = 0; i < size; i++)
    {
        if (arr[i] < head)
            left.push_back(arr[i]);
        if (arr[i] > head)
            right.push_back(arr[i]);
    }
    std::sort(left.begin(), left.end());
    std::sort(right.begin(), right.end());
    for (int i = 0; i < right.size(); i++)
    {
        cur_track = right[i];
        seek_sequence.push_back(cur_track);
        distance = abs(cur_track - head);
        seek_count += distance;
        head = cur_track;
    }
    seek_count += abs(head - left[0]);
    head = left[0];
    for (int i = 0; i < left.size(); i++)
    {
        cur_track = left[i];
        seek_sequence.push_back(cur_track);
        distance = abs(cur_track - head);
        seek_count += distance;
        head = cur_track;
    }
    cout << "Total number of seek operations = "
         << seek_count << endl;
    cout << "Seek Sequence is" << endl;
    for (int i = 0; i < seek_sequence.size(); i++)
    {
        cout << seek_sequence[i] << endl;
    }
}
// Driver code
int main()
{
    // Request array
    int arr[size] = {176, 79, 34, 60,
                     92, 11, 41, 114};
    int head = 50;
    cout << "Initial position of head: " << head << endl;
    CLOOK(arr, head);
    return 0;
}
